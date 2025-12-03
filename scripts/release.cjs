#!/usr/bin/env node
/**
 * Release Helper Script
 * 
 * Usage:
 *   node scripts/release.js patch   - Bug fixes (1.0.0 → 1.0.1)
 *   node scripts/release.js minor   - New features (1.0.0 → 1.1.0)
 *   node scripts/release.js major   - Breaking changes (1.0.0 → 2.0.0)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const type = process.argv[2];

if (!['patch', 'minor', 'major'].includes(type)) {
    console.log(`
🚀 Brandemic Release Helper

Usage:
  node scripts/release.js <type>

Types:
  patch  - Bug fixes (1.0.0 → 1.0.1)
  minor  - New features (1.0.0 → 1.1.0)  
  major  - Breaking changes (1.0.0 → 2.0.0)

Example:
  node scripts/release.js patch
`);
    process.exit(1);
}

function run(cmd, description) {
    console.log(`\n📦 ${description}...`);
    try {
        execSync(cmd, { stdio: 'inherit' });
        console.log(`✅ Done!`);
    } catch (error) {
        console.error(`❌ Failed: ${error.message}`);
        process.exit(1);
    }
}

console.log(`\n🚀 Starting ${type} release...\n`);

// 1. Check for uncommitted changes
try {
    const status = execSync('git status --porcelain').toString();
    if (status) {
        console.log('⚠️  You have uncommitted changes. Committing them first...');
        run('git add -A', 'Staging changes');
        run('git commit -m "Pre-release changes"', 'Committing changes');
    }
} catch (e) {
    // Git not initialized or other error - continue anyway
}

// 2. Build
run('npm run build', 'Building project');

// 3. Bump version
run(`npm version ${type} --no-git-tag-version`, 'Bumping version');

// 4. Get new version
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')));
const version = pkg.version;

// 5. Commit and tag
run('git add -A', 'Staging all changes');
run(`git commit -m "Release v${version}"`, 'Creating release commit');
run(`git tag v${version}`, 'Creating version tag');

// 6. Push
run('git push', 'Pushing to remote');
run('git push --tags', 'Pushing tags');

console.log(`
✨ Release v${version} complete!

📋 Next steps:
1. Wait 1-2 minutes for jsDelivr to cache
2. Update your Webflow script URL to:
   
   https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@v${version}/dist/main.min.js

3. Test on staging first!
4. Then publish Webflow to production
`);

