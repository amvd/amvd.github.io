import { getPosts } from '$lib/posts';
import { config } from '$lib/config';

export const prerender = true;

export async function GET() {
	const posts = await getPosts();

	const siteUrl = 'https://armand.io'; // Fallback if not in config
	const siteTitle = config.title || 'amvd';
	const siteDescription = config.description || '';

	const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
	<title>${siteTitle}</title>
	<description>${siteDescription}</description>
	<link>${siteUrl}</link>
	<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
	<language>en-us</language>
	<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
	${posts
		.map(
			(post) => `
		<item>
			<title>${post.title}</title>
			<description>${post.description || ''}</description>
			<link>${siteUrl}/blog/${post.slug}</link>
			<guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
		</item>
	`
		)
		.join('')}
</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml'
		}
	});
}
