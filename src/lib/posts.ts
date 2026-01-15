import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface Post {
	slug: string;
	title: string;
	date: string;
	categories?: string;
	description?: string;
	[key: string]: any;
}

export async function getPosts(): Promise<Post[]> {
	const filenames = fs.readdirSync(postsDirectory);

	const posts = filenames
		.filter((filename: string) => filename.endsWith('.md'))
		.map((filename: string) => {
			const filePath = path.join(postsDirectory, filename);
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const { data } = matter(fileContent);

			return {
				slug: filename.replace('.md', ''),
				...data
			} as Post;
		})
		.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return posts;
}

export async function getPost(slug: string) {
	const filePath = path.join(postsDirectory, `${slug}.md`);
	if (!fs.existsSync(filePath)) return null;

	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);

	return {
		meta: data as Post,
		content
	};
}
