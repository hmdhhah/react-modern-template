import { ReactNode } from 'react';

import clsx from 'clsx';

import styles from './form-text.module.scss';

interface FormTextProps {
  type?: 'valid' | 'invalid';
  children: ReactNode | string;
  className?: string;
}

export const FormText = ({
  type = 'invalid',
  children,
  className
}: FormTextProps) => {
  const formTextClassName = clsx(styles[type], styles.formText, className);
  return children ? <div className={formTextClassName}>{children}</div> : null;
};
