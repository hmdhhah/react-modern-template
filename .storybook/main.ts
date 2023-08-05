import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
const { mergeConfig } = require('vite');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  previewHead: head => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
  `,
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: null,
        preprocessorOptions: {
          scss: {
            additionalData: `
                            @import "${path.resolve(
                              __dirname,
                              '../src/assets/scss/styles.scss'
                            )}";
                        `
          }
        }
      }
    });
  }
};
export default config;
