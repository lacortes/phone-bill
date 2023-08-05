import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from '@mui/material';
import { AccountCircle, Article } from '@mui/icons-material';
import { useState } from 'react';
import { Container } from '@mui/system';
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Admin = () => {
    const [ anchorEl, setAnchorEl ] = useState();
    const navigate = useNavigate();
    const isMenuOpened = Boolean(anchorEl);

    const isTab = (tabName) => {
        const fullPath = window.location.href;
        if (!fullPath) return false;

        const tokens = fullPath.split('/');

        for (let idx = tokens.length - 1; idx >= 0;  idx--) {
            const path = tokens[idx];
            if (tabName === path) return true;
        }

        return false;
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (

        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ 
                    width: `calc(100% - ${ drawerWidth }px)`, 
                    ml: `${drawerWidth}px`,
                    bgcolor: 'white',
                    boxShadow: 'rgb(100 116 139 / 12%) 0px 1px 4px'
                }}
            >
                <Toolbar sx={{ width: '100%', justifyContent: 'space-between' }}>
                    <Box />
                    <IconButton
                        onClick={handleMenuClick}
                    >
                        <AccountCircle fontSize='large'/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpened}
                        elevation={1}
                        sx={{ '& .MuiList-root': { '.MuiButtonBase-root': { width: 300 } } }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}   
                    >
                        <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: 'primary.dark'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List
                    sx={{
                        '&& .Mui-selected, && .Mui-selected:hover': { '&, & .MuiListItemIcon-root': { bgcolor: 'primary.main' }, },
                        // hover states
                        '& .MuiListItemButton-root:hover' : { bgcolor: 'primary.main' },
                    }}
                >
                    {[ 'Statements' ].map((text) => (
                        <ListItem 
                            key={text} 
                            disablePadding
                        >
                            <ListItemButton
                                selected={isTab('statements')}
                                onClick={() => navigate('statements')}
                            >
                                <ListItemIcon sx={{ color: '#ffffff' }}>
                                    <Article />
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ color: '#ffffff' }}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
                bgcolor='#F9FAFC'
            >
                <Toolbar  sx={{ mb: 2 }} />
                <Container>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default Admin;