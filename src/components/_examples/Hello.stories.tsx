import { ComponentMeta } from '@storybook/react';
import { storyTemplate } from '../../../.storybook/helpers';
import { HelloCard } from './Hello';

export default {
  title: 'Components/HelloCard',
  component: HelloCard,
} as ComponentMeta<typeof HelloCard>;

const template = storyTemplate(HelloCard);

export const Default = template({
  content: '',
});