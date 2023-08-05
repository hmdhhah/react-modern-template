import MuiFormLabel, { FormLabelProps } from '@mui/material/FormLabel';
import styles from './form-label.module.scss';
export const FormLabel = (props: FormLabelProps) => {
  return <MuiFormLabel {...props} classes={{ root: styles.root }} />;
};
