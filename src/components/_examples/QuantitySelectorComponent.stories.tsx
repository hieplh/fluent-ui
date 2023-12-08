import { ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {QuantitySelectorComponent, QuantitySelectorComponentProps} from 'mystique/components/QuantitySelectorComponent';
import {storyTemplate} from '../../../.storybook/helpers';
import { List } from 'mystique/components/List';


export default {
  component: QuantitySelectorComponent,
  title: 'Fluent Plugin/List/Sub Components/Column Components/Quantity Selector (Component ver.)',
} as ComponentMeta<typeof QuantitySelectorComponent>;

const template = storyTemplate(QuantitySelectorComponent);

const requiredProps: QuantitySelectorComponentProps = {
  name: 'QuantitySelectorComponent',
  label: 'QuantitySelectorComponent label',
  data: {
    value: 0,
  },
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

export const Default = template({
  ...requiredProps,
  value: {
    value: '{{value}}',
    id: 'myQuantitySelector',
  },
});

export const Bounded = template({
  ...requiredProps,
  value: {
    value: '{{value}}',
    id: 'myQuantitySelector',
  },
  validation: {
    min: 0,
    max: 10,
  },
});

export const InnerText = template({
  ...requiredProps,
  innerText: {
    string: 'of {{max}}',
    options: {
      color: {
        all: 'primary',
        some: 'secondary',
        none: 'error',
      },
    },
  },
  validation: {
    max: 10,
  },
});

export const InvalidData = template({
  ...requiredProps,
  value: {
    value: '{{value}}',
    id: 'myQuantitySelector',
  },
  itemValidation: {
    condition: '{{eq value 0}}',
    messageOnInvalid: '<Insert Invalid Message Here>',
  },
});

const template_list = storyTemplate(List);
export const ListOrder = template_list({
  title: 'Title List Orders',
  rowsPerPageOptions: [2, 4, 6, 8, 10],
  defaultPageSize: 2,
  responsiveness: 'table',
  attributes: [
    {
      label: 'ID',
      value: '{{node.id}}',
      options: {
        styles: [
          {
            matches: ['6001419'],
            icon: {
              name: 'MdTick',
            },
            text: {
              color: 'primary',
            },
          },
        ],
      },
    },
    {
      label: 'Ref',
      value: '{{node.ref}}',
      options: {
        styles: [
          {
            value: '{{node.id}}',
            matches: ['6001421', '6001418'],
            text: {
              color: 'error',
            },
          },
        ],
      },
    },
    {
      label: 'Type',
      value: '{{node.status}}',
      options: {
        styles: [
          {
            // expression: '{{eq node.status BOOKED}}',
            text: {
              color: 'warning',
            },
          },
        ],
      },
    },
  ],
  filter: {
    enabled: true,
  },
  data: [
    {
      node: {
        id: '6001421',
        ref: 'clonedev_hd_31K',
        type: 'HD',
        status: 'RECEIVED',
        totalPrice: 654123.0,
        createdOn: '2023-11-07T14:06:21.965Z',
        customer: {
          firstName: 'demo',
          lastName: 'demo',
        },
      },
      cursor: 'Y3Vyc29yOi0tLTYwMDE0MjFfXzE2OTkzNjU5ODE5NjU=',
    },
    {
      node: {
        id: '6001420',
        ref: 'clonedev_hd_32K',
        type: 'HD',
        status: 'BOOKED',
        totalPrice: 654123.0,
        createdOn: '2023-11-07T14:06:21.861Z',
        customer: {
          firstName: 'demo',
          lastName: 'demo',
        },
      },
      cursor: 'Y3Vyc29yOi0tLTYwMDE0MjBfXzE2OTkzNjU5ODE4NjE=',
    },
    {
      node: {
        id: '6001419',
        ref: 'clonedev_hd_31J',
        type: 'HD',
        status: 'RECEIVED',
        totalPrice: 654123.0,
        createdOn: '2023-11-07T11:39:30.992Z',
        customer: {
          firstName: 'demo',
          lastName: 'demo',
        },
      },
      cursor: 'Y3Vyc29yOi0tLTYwMDE0MTlfXzE2OTkzNTcxNzA5OTI=',
    },
    {
      node: {
        id: '6001418',
        ref: 'clonedev_hd_32J',
        type: 'HD',
        status: 'RECEIVED',
        totalPrice: 654123.0,
        createdOn: '2023-11-07T11:39:30.881Z',
        customer: {
          firstName: 'demo',
          lastName: 'demo',
        },
      },
      cursor: 'Y3Vyc29yOi0tLTYwMDE0MThfXzE2OTkzNTcxNzA4ODE=',
    },
  ], 
});