/**
 * Markdown Image Registry
 * 
 * Automatically scans src/lib/assets for images and maps their filenames
 * (without extensions) to Vite-optimized asset URLs.
 */

// Scan for common image formats in the assets directory
// We use a relative path from this file (src/lib/images.ts) to src/lib/assets
const imageModules = import.meta.glob(
    './assets/blog-images/**/*.{avif,gif,heic,jpeg,jpg,png,svg,webp}', 
    { eager: true }
);

export const imageRegistry = Object.entries(imageModules).reduce((acc, [path, module]) => {
    // Extract filename without extension (e.g., ./assets/posts/my-image.png -> my-image)
    const filename = path.split('/').pop()?.split('.').slice(0, -1).join('.');
    
    if (filename) {
        // Vite's eager glob returns the module; the default export is the optimized URL string
        acc[filename] = (module as { default: string }).default;
    }
    
    return acc;
}, {} as Record<string, string>);
