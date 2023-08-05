import Button from '@components/button/button';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.scss';
import { GoogleIcon } from '@assets/icons/icons';
import Checkbox from '@components/checkbox/checkbox';
import { FormControl } from '@components/form-control/form-control';
import { FormLabel } from '@components/form-label/form-label';
import Input from '@components/input/input';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

interface SignUpProps {}

export const SignUp = (props: SignUpProps) => {
  const navigate = useNavigate();
  const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);

  const responseGoogleSuccess = async (googleRes: CredentialResponse) => {};

  const responseGoogleFailure = () => {};

  const handleFocus = () => {};

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: ''
    },
    onSubmit: values => {
      navigate('/onboarding', {
        state: {
          fullName: values.full_name,
          email: values.email
        }
      });
    }
  });

  const getCheckboxLabel = () => {
    return (
      <div className={styles.checkboxLabel}>
        I agree to the <span>Terms of Service </span>and{' '}
        <span>Privacy Policy </span>
      </div>
    );
  };

  const handleCheckBox = () => {
    setTermsAndConditions(prevState => !prevState);
  };

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>Sign up</div>
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
            <FormControl>
              <FormLabel>Enter your name</FormLabel>
              <Input
                name="full_name"
                placeholder="Full name"
                type="name"
                onChange={formik.handleChange}
                required
                size="l"
                onBlur={formik.handleBlur}
                onFocus={handleFocus}
                value={formik.values.full_name}
              />
            </FormControl>
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
            <Checkbox
              name={'terms'}
              onChange={handleCheckBox}
              label={getCheckboxLabel()}
              labelClassName={styles.checkboxLabel}
              className={styles.signUpCheckbox}
            />
            <Button
              size="xl"
              fullWidth
              disabled={formik.isSubmitting || !termsAndConditions}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
