import yaml from 'js-yaml';

// Use Vite's glob import to get all project markdown files
const modules = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true });

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

export const getAllProjects = () => {
    const projects = [];
    
    for (const path in modules) {
        const rawContent = modules[path];
        const { data } = parseMarkdown(rawContent);
        const id = path.split('/').pop().replace('.md', '');
        
        projects.push({
            ...data,
            id: id,
        });
    }
    
    // Sort by year descending (optional, depending on project structure)
    return projects.sort((a, b) => b.year - a.year);
};
