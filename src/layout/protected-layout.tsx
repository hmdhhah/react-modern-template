import { getAccessToken } from '@helpers/storage';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';

interface ProtectedLayoutProps {}

const ProtectedLayout = (props: ProtectedLayoutProps) => {
  const auth = getAccessToken();
  const location = useLocation();
  if (auth) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to={'/login'}
        state={{
          redirectTo: location.pathname
        }}
      />
    );
  }
};
export default ProtectedLayout;
