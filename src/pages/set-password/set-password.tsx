import { useFormik } from 'formik';
import styles from './set-password.module.scss';
import { FormControl } from '@components/form-control/form-control';
import { FormLabel } from '@components/form-label/form-label';
import Input from '@components/input/input';
import Button from '@components/button/button';
import { useState } from 'react';
import { FormText } from '@components/form-text/form-text';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { EyeIcon } from '@assets/icons/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthMethod } from '@services/auth.service';

interface SetPasswordProps {}
interface LocationState {
  token: string;
}
interface FormValues {
  password: string;
  confirm_password: string;
}

export const SetPassword = (props: SetPasswordProps) => {
  const location: { state: LocationState } = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(prevShowConfirmPassword => !prevShowConfirmPassword);
  };

  const handleFocus = () => {};
  const handleSubmit = async (values: FormValues) => {
    const { token } = location.state;
    try {
      console.log(token, values, 'val2');

      const res = await AuthMethod.inviteConfirmPassword(
        values.password,
        token
      );
      navigate('/login');
    } catch (error) {
      //todo
    }
  };
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    validate: values => {
      const errors = {} as { confirm_password: string };

      if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Passwords do not match';
      }

      return errors;
    },
    onSubmit: values => {
      handleSubmit(values);
    }
  });

  return (
    <div className={styles.root}>
      <div className={clsx(styles.topBar, styles.errorWrapedTitle)}>
        Set your password
        {formik.touched.confirm_password && formik.errors.confirm_password ? (
          <FormText type="invalid">{formik.errors.confirm_password}</FormText>
        ) : null}
      </div>

      <div className={styles.dialog}>
        <div className={styles.body}>
          <form onSubmit={formik.handleSubmit}>
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
            <FormControl>
              <FormLabel>Confirm password</FormLabel>
              <Input
                name="confirm_password"
                placeholder="Confirm password"
                type={showConfirmPassword ? 'text' : 'password'}
                onChange={formik.handleChange}
                required
                size="l"
                onBlur={formik.handleBlur}
                onFocus={handleFocus}
                value={formik.values.confirm_password}
                endAdornment={
                  <IconButton
                    onClick={handleToggleConfirmPassword}
                    edge="end"
                    className={styles.eyeButton}
                    type="button"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </FormControl>

            <Button size="xl" fullWidth className={styles.setpasswordbtn}>
              Let’s get started
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SetPassword;
