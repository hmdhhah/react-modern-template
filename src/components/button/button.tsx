import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

export interface ButtonProps {
  children?: ReactNode | string;
  variant?: 'primary' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  ghost?: boolean;
  onClick?: () => void;
}

const Button = ({
  children = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  ghost = false,
  onClick
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidthBtn : null,
        className,
        disabled ? styles.disabled : null,
        ghost ? styles.ghost : null
      )}
      type="submit"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
