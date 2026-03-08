import matter from 'gray-matter';

// Use Vite's glob import to get all markdown files
const modules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export const getAllPosts = (lang = 'en') => {
    const posts = [];
    
    for (const path in modules) {
        // Only process files matching the requested language
        if (path.endsWith(`.${lang}.md`)) {
            const content = modules[path];
            const { data } = matter(content);
            posts.push({
                ...data,
                id: data.slug, // Use slug as ID
            });
        }
    }
    
    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostBySlug = (slug, lang = 'en') => {
    const path = `../content/blog/${slug}.${lang}.md`;
    const content = modules[path];
    
    if (!content) return null;
    
    const { data, content: body } = matter(content);
    return {
        ...data,
        body
    };
};
