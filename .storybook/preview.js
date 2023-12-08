import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { FixMuiClassnames } from '../src/utils/TestUtils';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // viewport: {
  //   defaultViewport: 'iphone5',
  //   viewports: INITIAL_VIEWPORTS
  // },
}

export const decorators = [
  (Story) => (
    <FixMuiClassnames>
      <Story />
    </FixMuiClassnames>
  )
];