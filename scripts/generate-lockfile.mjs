import { execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

const projectDir = join(import.meta.dirname, '..');

// Remove pnpm-lock.yaml if it exists (npm can't use it)
const pnpmLock = join(projectDir, 'pnpm-lock.yaml');
if (existsSync(pnpmLock)) {
  unlinkSync(pnpmLock);
  console.log('Removed pnpm-lock.yaml');
}

// Remove any existing package-lock.json
const npmLock = join(projectDir, 'package-lock.json');
if (existsSync(npmLock)) {
  unlinkSync(npmLock);
  console.log('Removed old package-lock.json');
}

// Generate fresh package-lock.json
console.log('Generating fresh package-lock.json...');
execSync('npm install --package-lock-only', { cwd: projectDir, stdio: 'inherit' });
console.log('Done! Fresh package-lock.json created.');
