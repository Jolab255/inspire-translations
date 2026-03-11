import { Octokit } from '@octokit/rest';
import yaml from 'js-yaml';

const REPO_OWNER = 'Jolab255';
const REPO_NAME = 'inspire-translations';
const BRANCH = 'main';

// Helper to get authenticated Octokit instance
const getOctokit = () => {
    const token = sessionStorage.getItem('github_cms_token');
    if (!token) throw new Error("Not authenticated");
    return new Octokit({ auth: token });
};

// Helper to encode/decode Base64 handling UTF-8 properly using modern APIs
const utf8ToBase64 = (str) => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

const base64ToUtf8 = (str) => {
    const binary = window.atob(str);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
};

/**
 * Fetch a list of files in a specific directory
 * Cache-busted via query param to ensure we see new files immediately
 */
export const getFilesList = async (path) => {
    const octokit = getOctokit();
    try {
        console.log(`CMS: Fetching list for ${path}...`);
        // Octokit's getContent doesn't directly support query params in the object,
        // so we use a lower-level request to ensure the URL is cache-busted.
        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: path,
            ref: BRANCH,
            t: new Date().getTime() // Cache buster
        });
        console.log(`CMS: Found ${Array.isArray(response.data) ? response.data.length : 0} items in ${path}`);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error(`CMS: Error fetching file list for ${path}:`, error);
        return [];
    }
};

/**
 * Read and parse a single markdown file
 * Cache-busted via query param to ensure we get the latest SHA
 */
export const getFileContent = async (path) => {
    const octokit = getOctokit();
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: path,
        ref: BRANCH,
        t: new Date().getTime() // Cache buster
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
 * Internal helper to get the latest SHA for a file
 * Bypasses cache by adding a timestamp query param
 */
const getLatestSha = async (path) => {
    const octokit = getOctokit();
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: path,
            ref: BRANCH,
            t: new Date().getTime() // Cache buster
        });
        return response.data.sha;
    } catch (error) {
        // If file doesn't exist, this is expected for new files
        return null; 
    }
};

/**
 * Save (create or update) a markdown file
 * Now automatically fetches the latest SHA to prevent conflicts
 */
export const saveFileContent = async (path, frontmatterData, bodyContent, sha, commitMessage) => {
    const octokit = getOctokit();
    
    // Auto-fetch fresh SHA right before save to prevent "Conflict" errors
    const freshSha = await getLatestSha(path);
    
    const yamlString = yaml.dump(frontmatterData);
    const newContent = `---\n${yamlString}---\n\n${bodyContent}`;
    
    try {
        const response = await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: path,
            message: commitMessage || `CMS Update: ${path}`,
            content: utf8ToBase64(newContent),
            branch: BRANCH,
            sha: freshSha || sha // Use fresh one primarily
        });
        return response.data.content.sha;
    } catch (error) {
        console.error("GitHub File Save Error:", error);
        if (error.status === 409) {
            throw new Error("Conflict: GitHub reported a newer version. We tried to auto-sync but it failed. Please refresh and try again.");
        }
        throw error;
    }
};

/**
 * Save a JSON file
 * Now automatically fetches the latest SHA to prevent conflicts
 */
export const saveJsonContent = async (path, jsonData, sha, commitMessage) => {
    const octokit = getOctokit();
    const newContent = JSON.stringify(jsonData, null, 2);
    
    // Auto-fetch fresh SHA right before save
    const freshSha = await getLatestSha(path);
    
    try {
        const response = await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: path,
            message: commitMessage || `CMS Update: ${path}`,
            content: utf8ToBase64(newContent),
            branch: BRANCH,
            sha: freshSha || sha
        });
        return response.data.content.sha;
    } catch (error) {
        console.error("GitHub JSON Save Error:", error);
        if (error.status === 409) {
            throw new Error("Conflict: GitHub reported a newer version. We tried to auto-sync but it failed. Please refresh and try again.");
        }
        throw error;
    }
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

