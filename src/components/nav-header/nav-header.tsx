import { memo, useEffect, useState } from 'react';

import clsx from 'clsx';

import { AppLogo } from '@assets/icons/icons';
import Button from '@components/button/button';
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from '../sidebar/sidebar';
import styles from './nav-header.module.scss';

interface NavHeaderProps {}

export const NavHeader = memo(() => {
  const [sidebar, setSidebar] = useState(false);
  const breakpoint_xl = useMediaQuery('(min-width: 1200px)');
  const handleOpen = () => setSidebar(prev => !prev);

  useEffect(() => {
    setSidebar(false);
  }, [breakpoint_xl]);

  return breakpoint_xl ? (
    <Sidebar />
  ) : (
    <>
      <div className={styles.nav_header_space}></div>
      <nav className={clsx(styles.mobile_header)}>
        <AppLogo />
        <Button onClick={handleOpen} variant="outlined">
          Expand
        </Button>
        {sidebar && (
          <div
            className={clsx(
              styles.sidebar_container,
              sidebar ? styles.show_sidebar : styles.hide_sidebar
            )}
          >
            <div
              className={styles.mobile_sidebar_bg}
              onClick={() => handleOpen()}
            ></div>
            <Sidebar
              isMobile
              onClose={handleOpen}
              className={styles.sidebar_inner}
            />
          </div>
        )}
      </nav>
    </>
  );
});
