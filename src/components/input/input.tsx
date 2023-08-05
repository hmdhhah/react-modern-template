import { InputBase, InputBaseProps } from '@mui/material';
import styles from './input.module.scss';
import IconButton from '@components/icon-button/icon-button';
import clsx from 'clsx';

interface InputProps extends Omit<InputBaseProps, 'size'> {
  size?: 'xs' | 's' | 'm' | 'l';
  label?: string;
}

export const Input = ({ size = 'l', label = '', ...props }: InputProps) => {
  return (
    <div className={clsx(styles.inputRoot)}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        fullWidth
        classes={{
          root: clsx(styles.root, styles[`size-${size}`]),
          formControl: '',
          focused: '',
          disabled: '',
          adornedStart: '',
          adornedEnd: '',
          error: '',
          sizeSmall: '',
          multiline: '',
          colorSecondary: '',
          fullWidth: '',
          hiddenLabel: '',
          readOnly: '',
          input: '',
          inputTypeSearch: '',
          inputAdornedStart: styles.cool,
          inputAdornedEnd: '',
          inputHiddenLabel: ''
        }}
        {...props}
        endAdornment={
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            {props.endAdornment}
          </IconButton>
        }
        startAdornment={
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            {props.startAdornment}
          </IconButton>
        }
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </div>
  );
};
export default Input;
