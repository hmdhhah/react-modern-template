import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;

// .storybook/preview.js

import { CssBaseline, ThemeProvider } from '@mui/material';

import React from 'react';
import { theme } from '../src/config/mui';

/* snipped for brevity */

export const withMuiTheme = Story => (
  <ThemeProvider theme={theme}>
    {/* <CssBaseline /> */}
    <Story />
  </ThemeProvider>
);

export const decorators = [withMuiTheme];
