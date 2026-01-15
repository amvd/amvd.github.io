import fs from 'fs';
import path from 'path';

const title = process.argv[2];

if (!title) {
    console.error('Please provide a title for the post.');
    console.log('Usage: node scripts/new-post.js "My New Post"');
    process.exit(1);
}

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
};

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const datestring = `${year}-${month}-${day}`;

const slug = slugify(title);
const filename = `${datestring}-${slug}.md`;
const filepath = path.join('src/posts', filename);

const frontmatter = `---
title: ${title}
date: ${datestring}
categories: 
description: 
---

Start writing your post here...
`;

if (fs.existsSync(filepath)) {
    console.error(`Error: Post already exists at ${filepath}`);
    process.exit(1);
}

fs.writeFileSync(filepath, frontmatter);

console.log(`Successfully created new post at ${filepath}`);
