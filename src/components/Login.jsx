/* eslint-disable no-unused-vars */
import { Container, Box, TextField, Avatar, Typography, Grid, Button, Checkbox, Link, FormControlLabel, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import cognitoService from '../core/services/cognitoService';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ invalidPhone, setInvalidPhone ] = useState(false);
    const [ invalidPass, setInvalidPass ] = useState(false);
    const [ phoneHelperText, setPhoneHelperText ] = useState(''); 

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(old => !old);
    const handleMouseDownPassword = e => e.preventDefault();
    const handlePhoneInputChange = e => {
        const val = e.target.value;
        const isValid = /^\d{10}$/.test(val);
        if (!isValid && val && val.length > 1 && /[a-z]|[A-Z]/.test(val)) {
            setPhoneHelperText('Digits only');
        } else {
            setPhoneHelperText('');
        }

        setInvalidPhone( isValid === false );
        setPhoneNumber(val);
    };
    const handlePassInputChange = e => {
        const isValid = e.target.value !== '';
        setInvalidPass( isValid === false );
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if ( invalidPhone || invalidPass ) {
            return;
        }

        (async () => {  
            try {
                await cognitoService.authenticateUser(phoneNumber, password);
                navigate('/admin/statements', { replace: true });
            } catch (err) {
                console.error(err);
            }
        })();

    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" method="POST"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        error={invalidPhone}
                        helperText={phoneHelperText}
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="phone"
                        autoFocus
                        onChange={handlePhoneInputChange}
                        InputProps={{ startAdornment: <InputAdornment position="start">+1</InputAdornment> }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePassInputChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment> 
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={ invalidPass === true || invalidPhone === true || phoneNumber === '' || password === ''}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {'Don\'t have an account? Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};
export default Login;