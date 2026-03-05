import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BugReportIcon from '@mui/icons-material/BugReport';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showStack: false,
      copied: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleCopy = () => {
    const { error, errorInfo } = this.state;
    const text = [
      `Error: ${error?.message || 'Unknown error'}`,
      '',
      'Stack Trace:',
      error?.stack || 'No stack available',
      '',
      'Component Stack:',
      errorInfo?.componentStack || 'N/A',
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    });
  };

  render() {
    const { hasError, error, errorInfo, showStack, copied } = this.state;

    if (hasError) {
      const errorMessage = error?.message || 'An unexpected error occurred.';
      const errorName = error?.name || 'Error';
      const stackTrace = error?.stack || 'No stack trace available.';
      const componentStack = errorInfo?.componentStack || '';

      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0D1B2A 0%, #1A2E40 100%)',
            color: '#fff',
            p: { xs: 3, md: 6 },
          }}
        >
          {/* Icon */}
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                bgcolor: 'rgba(247,161,26,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(247,161,26,0.3)',
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 48, color: '#F7A11A' }} />
            </Box>
          </Box>

          {/* Error type badge */}
          <Chip
            icon={<BugReportIcon sx={{ fontSize: '14px !important', color: '#F7A11A !important' }} />}
            label={errorName}
            sx={{
              bgcolor: 'rgba(247,161,26,0.12)',
              color: '#F7A11A',
              border: '1px solid rgba(247,161,26,0.3)',
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '0.78rem',
              mb: 2.5,
              height: 28,
            }}
          />

          {/* Title */}
          <Typography variant="h4" sx={{ fontFamily: 'Outfit', fontWeight: 800, color: '#FFFFFF', mb: 1.5, textAlign: 'center' }}>
            Something went wrong
          </Typography>

          {/* Actual error message */}
          <Box
            sx={{
              bgcolor: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderLeft: '3px solid #F7A11A',
              borderRadius: 2,
              px: 3,
              py: 2,
              mb: 4,
              maxWidth: 600,
              width: '100%',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.92rem',
                color: '#FFD580',
                wordBreak: 'break-word',
                lineHeight: 1.7,
              }}
            >
              {errorMessage}
            </Typography>
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{
                background: 'linear-gradient(135deg, #F7A11A, #D4880E)',
                color: '#fff',
                fontFamily: 'Outfit',
                fontWeight: 700,
                px: 3,
                borderRadius: 50,
                boxShadow: '0 4px 16px rgba(247,161,26,0.35)',
              }}
            >
              Refresh Page
            </Button>
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => (window.location.href = '/')}
              sx={{
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.3)',
                fontFamily: 'Outfit',
                fontWeight: 600,
                px: 3,
                borderRadius: 50,
                '&:hover': { borderColor: '#F7A11A', color: '#F7A11A' },
              }}
            >
              Go Home
            </Button>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={this.handleCopy}
              sx={{
                color: copied ? '#4ADE80' : 'rgba(255,255,255,0.6)',
                borderColor: copied ? '#4ADE80' : 'rgba(255,255,255,0.2)',
                fontFamily: 'Outfit',
                fontWeight: 600,
                px: 3,
                borderRadius: 50,
                transition: 'all 0.3s',
              }}
            >
              {copied ? 'Copied!' : 'Copy Error'}
            </Button>
          </Box>

          {/* Stack trace toggle */}
          <Button
            size="small"
            endIcon={showStack ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => this.setState({ showStack: !showStack })}
            sx={{
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'Outfit',
              fontSize: '0.8rem',
              mb: 1,
              '&:hover': { color: 'rgba(255,255,255,0.7)', bgcolor: 'transparent' },
            }}
          >
            {showStack ? 'Hide' : 'Show'} Technical Details
          </Button>

          <Collapse in={showStack} sx={{ maxWidth: 720, width: '100%' }}>
            <Box
              sx={{
                bgcolor: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 2,
                p: 2.5,
                overflowX: 'auto',
              }}
            >
              <Typography sx={{ color: '#F7A11A', fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1 }}>
                Stack Trace
              </Typography>
              <Typography
                component="pre"
                sx={{
                  color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'monospace',
                  fontSize: '0.73rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  lineHeight: 1.6,
                  m: 0,
                  mb: 2,
                }}
              >
                {stackTrace}
              </Typography>

              {componentStack && (
                <>
                  <Typography sx={{ color: '#F7A11A', fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1, mt: 1 }}>
                    Component Stack
                  </Typography>
                  <Typography
                    component="pre"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: 'monospace',
                      fontSize: '0.72rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      lineHeight: 1.6,
                      m: 0,
                    }}
                  >
                    {componentStack}
                  </Typography>
                </>
              )}
            </Box>
          </Collapse>

          {/* Footer */}
          <Typography sx={{ mt: 4, color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontFamily: 'Inter', textAlign: 'center' }}>
            If this keeps happening, send the error details to{' '}
            <Box component="a" href="mailto:info@inspiretranslations.co.tz" sx={{ color: '#F7A11A', opacity: 0.8 }}>
              info@inspiretranslations.co.tz
            </Box>
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
