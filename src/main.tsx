import '@assets/scss/styles.scss';
import Providers from '@contexts/providers';
import { LinearProgress } from '@mui/material';
import routers from '@routers/routers';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
const router = createBrowserRouter(routers);
const container = document.getElementById('root');
const root = createRoot(container!);
const app = (
  <Providers>
    <RouterProvider router={router} fallbackElement={<LinearProgress />} />
  </Providers>
);
root.render(app);
