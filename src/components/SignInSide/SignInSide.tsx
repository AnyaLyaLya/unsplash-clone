import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlined from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import './signInSide.scss';
import { useState } from 'react';
import {
  validateEmail, validatePassword,
} from '../../utils/validation.utils';
import { formTheme } from '../../themes/formTheme';
import { loginUser } from '../../utils/auth.utils';
import { useAppContext } from '../../contexts/AppContext';

const SignInSide = () => {
  const navigate = useNavigate();

  const { setUser } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      const userData = {
        name: '',
        email,
        password,
      };
  
      const isLoggedIn = loginUser(userData, setUser);

      if (isLoggedIn) {
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        setError('');
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!isEmailValid) {
        setEmailError('Please enter a valid email address.');
      }

      if (!isPasswordValid) {
        setPasswordError(
          'Please enter a password between 8 and 16 characters long, containing at least one uppercase letter and one digit.',
        );
      }
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: 'calc(100vh - 24px)',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'none',
            '@media (min-width: 1024px)': {
              display: 'block',
            },
          }}
        />
        <Grid
          item
          sx={{ boxShadow: 'none', justifyContent: 'center' }}
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 5,
              mx: 7,
              mb: 1,
              mt: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 'none',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#111' }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h2" variant="h1">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, boxShadow: 'none', alignItems: 'center' }}
            >
              <TextField
                sx={{
                  '& .MuiFormHelperText-root': {
                    fontSize: 10,
                  },
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
              />
              <TextField
                sx={{
                  '& .MuiFormHelperText-root': {
                    fontSize: 10,
                  },
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
                helperText={passwordError}
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    value="remember"
                  />
                )}
                label="Remember me"
              />
              {error !== '' && (
                <Typography component="text" variant="body1" color='red'>
                  {error}
              </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, height: '54px' }}
                id="form-button"
              >
                Sign in
              </Button>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                  <Link to="/register" id="text-link">
                    Don&apos;t have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;
