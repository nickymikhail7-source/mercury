import { execSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync } from 'fs';

console.log('🚀 Starting custom build process...');

try {
    // 1. Run Vite Build
    console.log('📦 Running Vite build...');
    execSync('vite build', { stdio: 'inherit' });

    // 2. Ensure dist exists
    if (!existsSync('dist')) {
        mkdirSync('dist');
    }

    // 3. Copy mercury_app.html
    console.log('📄 Copying mercury_app.html to dist...');

    // Try copying from root first, then public
    if (existsSync('mercury_app.html')) {
        copyFileSync('mercury_app.html', 'dist/mercury_app.html');
        console.log('✅ Copied from root');
    } else if (existsSync('public/mercury_app.html')) {
        copyFileSync('public/mercury_app.html', 'dist/mercury_app.html');
        console.log('✅ Copied from public');
    } else {
        throw new Error('❌ Could not find mercury_app.html in root or public folder');
    }

    console.log('✨ Build completed successfully!');
} catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
}
