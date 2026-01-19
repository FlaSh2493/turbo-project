import type { Preview } from '@storybook/react'
import { Toaster } from '@turbo-project/front-core-design'
import '../styles.css'

const preview: Preview = {
  decorators: [
    Story => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Foundation', 'Primitives', 'Components'],
      },
    },
  },
}

export default preview
