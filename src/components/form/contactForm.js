let submitHandler = null;
let retryTimeoutId = null;

const WORKER_URL       = 'https://brandemicrecaptcha.web-455.workers.dev/';
const RECAPTCHA_KEY    = '6LdUc9osAAAAAJ5DdiwM0gKwl60xPn0BVM1C2Q92';
const RECAPTCHA_ACTION = 'contact_form_submit';

const BLOCKED_EMAILS = [
    'vi.ta.lyapupse.n@gmail.com',
    'je.ga.j.uk.ose89@gmail.com',
    'sales_promo@meta.ua'
];

const URL_TRACKING_KEYS = ['gclid', 'wbraid', 'gbraid']; // URL-based, behave exactly like UTMs

function isEmailBlocked(email) {
    const clean = (email || '').trim().toLowerCase();
    return BLOCKED_EMAILS.some(blocked => blocked.trim().toLowerCase() === clean);
}

function val(id) {
    const el = document.getElementById(id);
    return el ? (el.value || '') : '';
}

/* ---------- Google click ID + GA client ID tracking ---------- */

function saveClickIdsFromURL() {
    const p = new URLSearchParams(window.location.search);
    URL_TRACKING_KEYS.forEach(key => {
        const value = p.get(key);
        if (value) localStorage.setItem(key, value);
    });
}

function getGAClientId() {
    const m = document.cookie.match(/_ga=GA\d\.\d\.(\d+\.\d+)/);
    return m ? m[1] : ''; // e.g. "1234567890.1699999999"
}

function getTrackingValues() {
    return {
        gclid:        localStorage.getItem('gclid') || '',
        wbraid:       localStorage.getItem('wbraid') || '',
        gbraid:       localStorage.getItem('gbraid') || '',
        ga_client_id: getGAClientId(),
    };
}

// Pushes tracking values into hidden fields (if present) for Webflow's native submit.
// Returns true once ga_client_id has been resolved (used to decide whether to keep retrying).
function populateTrackingFields() {
    const values = getTrackingValues();
    Object.keys(values).forEach(key => {
        const field = document.getElementById(key);
        if (field && values[key]) {
            field.value = values[key];
            field.setAttribute('value', values[key]);
        }
    });
    return !!values.ga_client_id;
}

function startTrackingCapture() {
    saveClickIdsFromURL();

    let tries = 0;
    (function retry() {
        const done = populateTrackingFields();
        if (!done && tries < 10) {
            tries++;
            retryTimeoutId = setTimeout(retry, 400);
        }
    })();
}

/* ---------- Form data + submission ---------- */

function collectFormData() {
    const fullName  = val('full_name').trim().split(' ');
    const firstName = fullName[0] || '';
    const lastName  = fullName.length > 1 ? fullName.slice(1).join(' ') : '\u200C\u200C';

    const requirements = [];
    ['Branding', 'Packaging', 'UI-UX', 'Web-Development', 'SEO'].forEach(id => {
        const cb = document.getElementById(id);
        if (cb && cb.checked) requirements.push(cb.getAttribute('data-name') || cb.name || id);
    });

    const serviceEl = document.querySelector('input[name="service_company"]:checked');

    return {
        firstName,
        lastName,
        email:          val('email'),
        contactNumber:  val('contact_number'),
        company:        val('company'),
        serviceCompany: serviceEl ? serviceEl.value : '',
        requirements:   requirements.join(';'),
        projectBudget:  val('project_budget'),
        deadline:       val('project_deadline'),
        message:        val('your_message'),
        howDidYouHear:  val('how_did_you_hear'),
        ...getTrackingValues(), // gclid, wbraid, gbraid, ga_client_id
    };
}

export function initContactForm() {
    const form = document.querySelector(
        '#wf-form-Contact-Form, #wf-form-Brandemic-Dubai, #wf-form-form-Contact-2'
    );
    if (!form) return;

    startTrackingCapture();

    // Top up hidden tracking fields right before Webflow sends the form (capture phase,
    // runs before Webflow's own submit handling).
    form.addEventListener('submit', populateTrackingFields, true);

    submitHandler = function (e) {
        const data = collectFormData();

        if (isEmailBlocked(data.email)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.warn('[CRM] Submission blocked: disallowed email');
            return;
        }

        grecaptcha.ready(function () {
            grecaptcha.execute(RECAPTCHA_KEY, { action: RECAPTCHA_ACTION })
                .then(function (token) {
                    fetch(WORKER_URL, {
                        method:  'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body:    JSON.stringify({ ...data, recaptchaToken: token }),
                    }).catch(err => console.error('[CRM] Worker request failed:', err));
                })
                .catch(err => console.error('[CRM] reCAPTCHA execute failed:', err));
        });
    };

    form.addEventListener('submit', submitHandler);
}

export function destroyContactForm() {
    const form = document.querySelector(
        '#wf-form-Contact-Form, #wf-form-Brandemic-Dubai, #wf-form-form-Contact-2'
    );

    if (form) {
        if (submitHandler) form.removeEventListener('submit', submitHandler);
        form.removeEventListener('submit', populateTrackingFields, true);
    }

    submitHandler = null;

    if (retryTimeoutId) {
        clearTimeout(retryTimeoutId);
        retryTimeoutId = null;
    }
}