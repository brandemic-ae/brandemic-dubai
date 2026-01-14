/**
 * HappyFeet Case Study - Curved Text Animation
 */

let curvedTextInstance = null;

class CurvedTextAnimation {
    constructor() {
        this.text = 'Socks that define you';
        this.waveWidth = 250;
        this.waveHeight = 250;
        this.speed = 1;
        this.direction = 'rtl';
        this.animationEnabled = true;
        
        this.path = document.getElementById('wavePath');
        this.textPath = document.getElementById('textPath');
        this.svg = document.querySelector('.curved-text-svg');
        
        this.offset = 0;
        this.patternLength = 0;
        this.rafId = null;
        this.resizeHandler = this.handleResize.bind(this);
        
        this.init();
    }

    init() {
        const separator = ' • ';
        const singlePattern = this.text + separator;
        const repeatedText = singlePattern.repeat(20);
        this.textPath.textContent = repeatedText;
        
        setTimeout(() => {
            this.measureText();
            this.generateWavePath();
            
            if (this.animationEnabled) {
                this.animate();
            }
        }, 100);
        
        window.addEventListener('resize', this.resizeHandler);
    }

    handleResize() {
        this.measureText();
        this.generateWavePath();
    }

    measureText() {
        try {
            const separator = ' • ';
            const singlePattern = this.text + separator;
            const tempText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            tempText.textContent = singlePattern;
            tempText.setAttribute('class', 'curved-text');
            this.svg.appendChild(tempText);
            const singleBBox = tempText.getBBox();
            this.patternLength = singleBBox.width;
            this.svg.removeChild(tempText);
        } catch (e) {
            this.patternLength = 500;
        }
    }

    generateWavePath() {
        const svgWidth = this.svg.clientWidth;
        const midPoint = this.waveHeight / 2;
        const amplitude = this.waveHeight / 4;
        
        const totalWidth = svgWidth + this.patternLength * 3;
        const cycles = Math.ceil(totalWidth / this.waveWidth);
        
        let pathData = `M -${this.waveWidth * 4} ${midPoint}`;
        
        for (let i = 0; i < cycles + 8; i++) {
            const x = (i * this.waveWidth) - (this.waveWidth * 4);
            const controlX = x + this.waveWidth / 2;
            
            if (i === 0) {
                pathData += ` Q ${controlX} ${midPoint + amplitude}, ${x + this.waveWidth} ${midPoint}`;
            } else {
                pathData += ` T ${x + this.waveWidth} ${midPoint}`;
            }
        }
        
        this.path.setAttribute('d', pathData);
    }

    animate() {
        const animateFrame = () => {
            if (!this.animationEnabled) return;
            
            const direction = this.direction === 'rtl' ? 1 : -1;
            this.offset += (0.8 * this.speed * direction);
            
            if (this.offset >= this.patternLength) {
                this.offset = 0;
            } else if (this.offset <= -this.patternLength) {
                this.offset = 0;
            }
            
            this.textPath.setAttribute('startOffset', this.offset);
            this.rafId = requestAnimationFrame(animateFrame);
        };
        
        this.rafId = requestAnimationFrame(animateFrame);
    }

    destroy() {
        this.animationEnabled = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
        window.removeEventListener('resize', this.resizeHandler);
    }
}

/**
 * Initialize HappyFeet curved text animation
 */
export function initHappyFeetAnimation() {
    const svg = document.querySelector('.curved-text-svg');
    if (!svg) return; // Guard: skip if elements don't exist
    
    curvedTextInstance = new CurvedTextAnimation();
}

/**
 * Destroy HappyFeet animation
 */
export function destroyHappyFeetAnimation() {
    if (curvedTextInstance) {
        curvedTextInstance.destroy();
        curvedTextInstance = null;
    }
}
