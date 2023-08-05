import { Navigate, Outlet, useLocation } from 'react-router-dom';

import styles from './onboarding-layout.module.scss';
import { getAccessToken } from '@helpers/storage';

interface OnboardingLayoutProps {
  children?: JSX.Element;
}

const OnboardingLayout = (props: OnboardingLayoutProps) => {
  const auth = getAccessToken();
  const location = useLocation();

  if (auth) {
    return (
      <Navigate
        to={'/dashboard'}
        state={{
          redirectTo: location.pathname
        }}
      />
    );
  } else {
    return (
      <div className={styles.root}>
        <div className={styles.onBoardLayoutBg}>Onboarding Layout</div>
        <Outlet />
      </div>
    );
  }
};

export default OnboardingLayout;
