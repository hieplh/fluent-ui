import { StorybookConfig } from '@storybook/core-common';
import { externalMaterialUI, externalMystique } from '../webpack.config';

// Extend webpack config from root
const config: StorybookConfig = {
  webpackFinal: async (config: any) => {
    // Additional param available : `, { configType }`: has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // 'PRODUCTION' is used when building the static version of storybook.

    config.externals = [{
      'react': 'React',
      'react-dom': 'ReactDOM',
    },
      externalMaterialUI,
      externalMystique
    ];

    return config;
  },
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  core: {
    builder: 'webpack5'
  }
};

module.exports = config;
