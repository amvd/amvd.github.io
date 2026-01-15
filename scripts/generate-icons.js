import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = 'src/lib/assets';
const outputDir = 'static';
const manifestPath = path.join(outputDir, 'site.webmanifest');

// Dynamically find the favicon source file
const files = fs.readdirSync(assetsDir);
const faviconFile = files.find(f => f.toLowerCase().startsWith('favicon.'));
const ogImageFile = files.find(f => f.toLowerCase().startsWith('og-image.'));

if (!faviconFile) {
    console.error(`Error: No file starting with "favicon" found in ${assetsDir}`);
    console.error('Please ensure you have a file like favicon.png, favicon.jpg, or favicon.svg.');
    process.exit(1);
}

const inputFavicon = path.join(assetsDir, faviconFile);
console.log(`Using ${inputFavicon} as source for icon generation.`);

let inputOgImage = null;
if (ogImageFile) {
    inputOgImage = path.join(assetsDir, ogImageFile);
    console.log(`Using ${inputOgImage} as source for OG image generation.`);
} else {
    console.warn(`Warning: No file starting with "og-image" found in ${assetsDir}. OG image will not be generated.`);
}

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
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
        // Generate PNGs
        for (const { name, size } of sizes) {
            const circleMask = Buffer.from(
                `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" /></svg>`
            );

            await sharp(inputFavicon)
                .resize(size, size, {
                    fit: 'cover',
                    position: 'center'
                })
                .composite([{
                    input: circleMask,
                    blend: 'dest-in'
                }])
                .toFile(path.join(outputDir, name));
            console.log(`Generated ${name} (circular, center-cropped)`);
        }

        // Generate OG image if source exists
        if (inputOgImage) {
            await sharp(inputOgImage)
                .resize(1200, 630, {
                    fit: 'cover',
                    position: 'center'
                })
                .toFile(path.join(outputDir, 'og-image.png'));
            console.log('Generated og-image.png (1200x630, center-cropped)');
        }

        // Generate .ico
        const icoSize = 32;
        const circleMaskIco = Buffer.from(
            `<svg><circle cx="${icoSize / 2}" cy="${icoSize / 2}" r="${icoSize / 2}" /></svg>`
        );

        await sharp(inputFavicon)
            .resize(icoSize, icoSize, {
                fit: 'cover',
                position: 'center'
            })
            .composite([{
                input: circleMaskIco,
                blend: 'dest-in'
            }])
            .toFile(path.join(outputDir, 'favicon.ico'));
        console.log('Generated favicon.ico (circular, center-cropped)');

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
