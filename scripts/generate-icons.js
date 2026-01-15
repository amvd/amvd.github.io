import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const input = 'src/lib/assets/favicon.png';
const outputDir = 'static';
const manifestPath = path.join(outputDir, 'site.webmanifest');

const sizes = [
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
];

const generatedIcons = [
    {
       "src": "/android-chrome-192x192.png",
       "sizes": "192x192",
       "type": "image/png"
    },
    {
     "src": "/android-chrome-512x512.png",
     "sizes": "512x512",
     "type": "image/png"
     }
];

async function generate() {
    if (!fs.existsSync(input)) {
        console.error(`Input file not found: ${input}`);
        process.exit(1);
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        // Generate PNGs
        for (const { name, size } of sizes) {
            await sharp(input)
                .resize(size, size)
                .toFile(path.join(outputDir, name));
            console.log(`Generated ${name}`);
        }

        // Generate .ico
        await sharp(input)
            .resize(32, 32)
            .toFile(path.join(outputDir, 'favicon.ico'));
        console.log('Generated favicon.ico');

        // Merge webmanifest
        let manifest = {};
        if (fs.existsSync(manifestPath)) {
            try {
                manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                console.log('Read existing site.webmanifest');
            } catch (e) {
                console.warn('Could not parse existing site.webmanifest, creating new one.');
            }
        }

        // Update icons field
        manifest.icons = generatedIcons;

        fs.writeFileSync(
            manifestPath, 
            JSON.stringify(manifest, null, 2)
        );
        console.log('Merged icons into site.webmanifest');

    } catch (err) {
        console.error('Error generating icons:', err);
    }
}

generate();
