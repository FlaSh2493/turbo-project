import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import viteConfig from '../vite.config'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {},
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal: async config => {
    return mergeConfig(config, viteConfig)
  },
}

export default config
