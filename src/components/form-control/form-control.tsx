import MuiFormControl, {
  FormControlProps as MuiFormControlProps
} from '@mui/material/FormControl';
import clsx from 'clsx';
import styles from './form-control.module.scss';

export interface FormControlProps extends MuiFormControlProps {
  fullWidth?: boolean;
  noStyle?: boolean;
}

export const FormControl = (props: FormControlProps) => {
  const className = clsx(styles.root);
  return (
    <div className={className}>
      <MuiFormControl {...props} classes={{ root: styles.root }} />
    </div>
  );
};
