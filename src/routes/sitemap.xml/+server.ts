import { getPosts } from '$lib/posts';
import { config } from '$lib/config';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();
	const siteUrl = config.url;

	const pages = [
		'',
		'/about',
		'/blog',
		'/resume'
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
	xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
	xmlns:xhtml="https://www.w3.org/1999/xhtml"
	xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
	xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
	xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
	xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
	${pages
		.map(
			(page) => `
	<url>
		<loc>${siteUrl}${page}</loc>
		<changefreq>monthly</changefreq>
		<priority>0.5</priority>
	</url>
	`
		)
		.join('')}
	${posts
		.map(
			(post) => `
	<url>
		<loc>${siteUrl}/blog/${post.slug}</loc>
		<changefreq>weekly</changefreq>
		<lastmod>${new Date(post.date).toISOString()}</lastmod>
		<priority>0.7</priority>
	</url>
	`
		)
		.join('')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
}
