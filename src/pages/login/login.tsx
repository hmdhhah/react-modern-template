import Button from '@components/button/button';
import { useFormik } from 'formik';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';

import { GoogleIcon } from '@assets/icons/icons';
import { FormControl } from '@components/form-control/form-control';
import { FormLabel } from '@components/form-label/form-label';
import { FormText } from '@components/form-text/form-text';
import Input from '@components/input/input';
import { getErrorMessages } from '@helpers/error';
import { setAuthenticationDetails } from '@helpers/storage';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { AuthMethod } from '@services/auth.service';

interface LoginProps {}

interface LoginFormValues {
  email: string;
  password: string;
}

export const Login = (props: LoginProps) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<ReactNode>('');

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const responseGoogleSuccess = async (googleRes: CredentialResponse) => {};

  const responseGoogleFailure = () => {};

  const handleFocus = () => {
    setLoginErrorMessage('');
  };

  const handleSubmit = async (values: LoginFormValues, setSubmitting: any) => {
    setSubmitting(true);
    try {
      const res = await AuthMethod.login(values);
      setAuthenticationDetails(res.data);
      navigate('/dashboard');
    } catch (error: any) {
      const msg = getErrorMessages(error);
      setLoginErrorMessage(msg);
      //todo
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values, { setSubmitting }) => {
      await handleSubmit(values, setSubmitting);
    }
  });

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>Login</div>
      <div className={styles.dialog}>
        <div className={styles.body}>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.googleSingIn}>
              <div className={styles.googleBtn}>
                <GoogleIcon />
                Sign in with Google
              </div>
              <div className={styles.goo}>
                <GoogleLogin
                  useOneTap
                  onSuccess={responseGoogleSuccess}
                  onError={responseGoogleFailure}
                  text={'signin_with'}
                  width={'336px'}
                  theme={'outline'}
                  size={'large'}
                  logo_alignment="left"
                />
              </div>
            </div>
            <div className={styles.horizontaldivider}></div>
            <FormText type="invalid" className={styles.loginErrorMsg}>
              {loginErrorMessage}
            </FormText>
            <FormControl>
              <FormLabel>Enter your email</FormLabel>
              <Input
                name="email"
                placeholder="rupert@react-modern-template.com"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={handleFocus}
                value={formik.values.email}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter password</FormLabel>
              <Input
                name="password"
                placeholder="password"
                type={showPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                required
                size="l"
                onBlur={formik.handleBlur}
                onFocus={handleFocus}
                value={formik.values.password}
                endAdornment={
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    className={styles.eyeButton}
                    type="button"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </FormControl>

            <Button
              size="xl"
              fullWidth
              disabled={formik.isSubmitting}
              className={styles.loginBtn}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
