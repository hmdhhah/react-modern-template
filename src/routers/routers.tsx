import { AuthLayout } from '@layout/auth-layout';
import OnboardingLayout from '@layout/onboarding-layout/onboarding-layout';
import ProtectedLayout from '@layout/protected-layout';
import Dashboard from '@pages/dashboard/dashboard';
import Login from '@pages/login/login';
import NotFound from '@pages/not-found/not-found';
import ResetPassword from '@pages/reset-password/reset-password';
import SetPassword from '@pages/set-password/set-password';
import Settings from '@pages/settings/settings';
import SignUp from '@pages/sign-up/sign-up';
import Support from '@pages/support/support';
import { RouteObject } from 'react-router-dom';

const getUserData = () =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve({ id: 1, name: 'aju' });
    }, 1000)
  );

export default [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        loader: async () => {
          return getUserData();
        },
        element: <AuthLayout />,

        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/settings', element: <Settings /> },
          { path: '/support', element: <Support /> }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <OnboardingLayout />,
    children: [{ index: true, element: <Login /> }]
  },
  {
    path: '/sign-up',
    element: <OnboardingLayout />,
    children: [{ index: true, element: <SignUp /> }]
  },

  {
    path: '/reset-password',
    element: <OnboardingLayout />,
    children: [{ index: true, element: <ResetPassword /> }]
  },
  {
    path: '/forgot-password',
    element: <OnboardingLayout />,
    children: [{ index: true, element: <ResetPassword /> }]
  },
  {
    path: '/set-password',
    element: <OnboardingLayout />,
    children: [{ index: true, element: <SetPassword /> }]
  },

  {
    path: '/*',
    element: <NotFound />
  }
] as RouteObject[];
