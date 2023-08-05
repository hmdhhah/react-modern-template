import { theme } from '@config/mui';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';

interface ProvidersProps {
  children: JSX.Element;
}

const Providers = (props: ProvidersProps) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </StyledEngineProvider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
