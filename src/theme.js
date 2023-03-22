import { createTheme } from '@mui/material';

let theme = createTheme({ 
    palette: { 
        primary: { 
            main: '#e20074',
            light: '#E7338F',
            dark: '#9E0051',
        },
        secondary: {
            main: '#F50057',
            light: '#F73378',
            dark: '#AB003C'
        }
    }
});

theme = createTheme(theme, {
    components: {
        MuiButton: { 
            styleOverrides: { 
                root: { height: 40 }, 
                containedPrimary: { '&:hover' :  { backgroundColor: theme.palette.primary.main } } 
            } 
        } 
    }
});

export { theme };