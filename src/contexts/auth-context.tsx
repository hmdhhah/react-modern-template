import { useLocalStorage } from '@hooks/use-local-storage';
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {}

interface AuthContextType {
  user: UserData | null;
  login: (data: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
  value: UserData;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  value: userData
}) => {
  const [user, setUser] = useLocalStorage<UserData | null>('user', userData);
  const navigate = useNavigate();

  const login = async (data: UserData) => {
    setUser(data);
    navigate('/', { replace: true });
  };

  const logout = () => {
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
