import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Octokit } from '@octokit/rest';

const AdminLogin = ({ onLogin }) => {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Test the token
            const octokit = new Octokit({ auth: token });
            const { data } = await octokit.rest.users.getAuthenticated();
            
            // If successful, save token and proceed
            sessionStorage.setItem('github_cms_token', token);
            onLogin(data);
        } catch (err) {
            setError('Invalid or expired Personal Access Token.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f8fafc' }}>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#FFFFFF', p: 5, borderTop: '4px solid #1A5C2A', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                    <Typography sx={{ fontFamily: '"Inknut Antiqua", serif', fontSize: '1.5rem', fontWeight: 700, color: '#1A5C2A', mb: 1, textAlign: 'center' }}>
                        Management Portal
                    </Typography>
                    <Typography sx={{ color: '#666', textAlign: 'center', mb: 4, fontFamily: 'Outfit' }}>
                        Enter your GitHub Personal Access Token to continue.
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                    <form onSubmit={handleLogin}>
                        <TextField
                            fullWidth
                            type="password"
                            label="GitHub Token (PAT)"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                            sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 0 } }}
                        />
                        <Button 
                            fullWidth 
                            type="submit" 
                            variant="contained" 
                            disabled={loading}
                            sx={{ 
                                bgcolor: '#F7A11A', 
                                color: '#1A5C2A', 
                                fontWeight: 800, 
                                py: 1.5, 
                                borderRadius: 0,
                                '&:hover': { bgcolor: '#e08f10' }
                            }}
                        >
                            {loading ? 'Authenticating...' : 'Secure Login'}
                        </Button>
                    </form>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminLogin;
