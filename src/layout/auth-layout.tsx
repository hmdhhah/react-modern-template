import { NavHeader } from '@components/nav-header/nav-header';
import { AuthProvider } from '@contexts/auth-context';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { Suspense } from 'react';
import { Await, useLoaderData, useOutlet } from 'react-router-dom';

export const AuthLayout = () => {
  const outlet = useOutlet();
  const data = useLoaderData();

  return (
    <Suspense fallback={<LinearProgress />}>
      <Await
        resolve={data}
        errorElement={<Alert severity="error">Something went wrong!</Alert>}
        children={user => (
          <AuthProvider value={user}>
            <NavHeader />
            <div id="sidebar-space">{outlet}</div>
          </AuthProvider>
        )}
      />
    </Suspense>
  );
};
