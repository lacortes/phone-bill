import { CssBaseline, ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ApiProvider from './providers/ApiProvider';
import { theme } from './theme';

const AllTheProviders = ({ children }) => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ApiProvider>
                    {children}
                </ApiProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

const customRender = (ui, options) => 
    render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };