import yaml from 'js-yaml';

// Use Vite's glob import to get all markdown files
const modules = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

const parseMarkdown = (content) => {
    const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = content.match(regex);
    
    if (!match) return { data: {}, content: content };
    
    try {
        const data = yaml.load(match[1]);
        return { data, content: match[2] };
    } catch (e) {
        console.error('Error parsing markdown frontmatter:', e);
        return { data: {}, content: match[2] };
    }
};

export const getAllPosts = (lang = 'en') => {
    const posts = [];
    
    for (const path in modules) {
        // Only process files matching the requested language
        if (path.endsWith(`.${lang}.md`)) {
            const rawContent = modules[path];
            const { data } = parseMarkdown(rawContent);
            
            if (data.slug) {
                posts.push({
                    ...data,
                    id: data.slug,
                });
            }
        }
    }
    
    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostBySlug = (slug, lang = 'en') => {
    const path = `../content/blog/${slug}.${lang}.md`;
    const rawContent = modules[path];
    
    if (!rawContent) return null;
    
    const { data, content: body } = parseMarkdown(rawContent);
    return {
        ...data,
        body
    };
};
