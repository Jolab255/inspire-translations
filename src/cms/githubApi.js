import { Octokit } from '@octokit/rest';
import yaml from 'js-yaml';

const REPO_OWNER = 'Jolab255';
const REPO_NAME = 'inspire-translations';
const BRANCH = 'boutique-minimalist';

// Helper to get authenticated Octokit instance
const getOctokit = () => {
    const token = sessionStorage.getItem('github_cms_token');
    if (!token) throw new Error("Not authenticated");
    return new Octokit({ auth: token });
};

// Helper to encode/decode Base64 handling UTF-8 properly
const utf8ToBase64 = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
};
const base64ToUtf8 = (str) => {
    return decodeURIComponent(escape(window.atob(str)));
};

/**
 * Fetch a list of files in a specific directory
 */
export const getFilesList = async (path) => {
    const octokit = getOctokit();
    try {
        const response = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: path,
            ref: BRANCH
        });
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching file list:", error);
        return [];
    }
};

/**
 * Read and parse a single markdown file
 */
export const getFileContent = async (path) => {
    const octokit = getOctokit();
    const response = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: path,
        ref: BRANCH
    });

    const content = base64ToUtf8(response.data.content);
    
    // Parse Markdown Frontmatter
    const regex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = content.match(regex);
    
    if (match) {
        const frontmatter = yaml.load(match[1]);
        return {
            sha: response.data.sha,
            data: frontmatter,
            body: match[2].trim()
        };
    }

    return { sha: response.data.sha, data: {}, body: content };
};

/**
 * Save (create or update) a markdown file
 */
export const saveFileContent = async (path, frontmatterData, bodyContent, sha, commitMessage) => {
    const octokit = getOctokit();
    
    // Reconstruct the file with Frontmatter
    const yamlString = yaml.dump(frontmatterData);
    const newContent = `---\n${yamlString}---\n\n${bodyContent}`;
    
    await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: path,
        message: commitMessage || `CMS Update: ${path}`,
        content: utf8ToBase64(newContent),
        branch: BRANCH,
        sha: sha // Required if updating an existing file
    });
};

/**
 * Save a JSON file
 */
export const saveJsonContent = async (path, jsonData, sha, commitMessage) => {
    const octokit = getOctokit();
    const newContent = JSON.stringify(jsonData, null, 2);
    
    await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: path,
        message: commitMessage || `CMS Update: ${path}`,
        content: utf8ToBase64(newContent),
        branch: BRANCH,
        sha: sha
    });
};

/**
 * Upload an image to the repository
 */
export const uploadMedia = async (file) => {
    const octokit = getOctokit();
    
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const base64Content = reader.result.split(',')[1];
            const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
            const path = `public/uploads/${fileName}`;
            
            try {
                await octokit.repos.createOrUpdateFileContents({
                    owner: REPO_OWNER,
                    repo: REPO_NAME,
                    path: path,
                    message: `Upload media: ${fileName}`,
                    content: base64Content,
                    branch: BRANCH
                });
                resolve(`/uploads/${fileName}`);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

/**
 * Fetch the latest deployment workflow runs
 */
export const getDeploymentStatus = async () => {
    const octokit = getOctokit();
    try {
        const response = await octokit.actions.listWorkflowRunsForRepo({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            per_page: 1
        });
        return response.data.workflow_runs[0];
    } catch (error) {
        console.error("Error fetching deployment status:", error);
        return null;
    }
};

/**
 * Delete a file from the repository
 */
export const deleteFile = async (path, sha) => {
    const octokit = getOctokit();
    await octokit.repos.deleteFile({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: path,
        message: `CMS Delete: ${path}`,
        sha: sha,
        branch: BRANCH
    });
};

