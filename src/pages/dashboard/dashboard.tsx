import { useAuth } from '@contexts/auth-context';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = useAuth();

  console.log(user, 'useruseruser');
  return (
    <div>
      Dashboard {JSON.stringify(user)}
      <Link to={'/customers'}>customers</Link>
    </div>
  );
};
export default Dashboard;
