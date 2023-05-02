import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import ApiProvider from './providers/ApiProvider';
import { theme } from './theme';

const container = document.querySelector('#root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ApiProvider>
                    <App />
                </ApiProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
}