import { ComponentMeta } from '@storybook/react';
import { storyTemplate } from '../../../../.storybook/helpers';
import { Edge, PageInfo } from './OrdersDTO';
import { OrderLayout } from './OrdersLayout';

export default {
  title: 'Components/OrderLayout',
  component: OrderLayout,
} as ComponentMeta<typeof OrderLayout>;
const template = storyTemplate(OrderLayout);

const edges = [
  {
    node: {
      id: '6001373',
      ref: 'clonedev_hd_35',
      type: 'HD',
      status: 'RECEIVED',
      totalPrice: 588.4838686117951,
      createdOn: '2023-10-27T09:04:02.932Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNzNfXzE2OTgzOTc0NDI5MzI=',
  },
  {
    node: {
      id: '6001372',
      ref: 'clonedev_hd_34',
      type: 'HD',
      status: 'RECEIVED',
      totalPrice: 991.0427620639783,
      createdOn: '2023-10-27T09:01:18.111Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNzJfXzE2OTgzOTcyNzgxMTE=',
  },
  {
    node: {
      id: '6001371',
      ref: 'clonedev_hd_33',
      type: 'HD',
      status: 'RECEIVED',
      totalPrice: 811.0930429416541,
      createdOn: '2023-10-27T08:56:46.075Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNzFfXzE2OTgzOTcwMDYwNzU=',
  },
  {
    node: {
      id: '6001370',
      ref: 'clonedev_hd_32C',
      type: 'HD',
      status: 'RECEIVED',
      totalPrice: 97.78650827302738,
      createdOn: '2023-10-26T11:49:11.043Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNzBfXzE2OTgzMjA5NTEwNDM=',
  },
  {
    node: {
      id: '6001369',
      ref: 'clonedev_hd_32',
      type: 'HD',
      status: 'RECEIVED',
      totalPrice: 97.78650827302738,
      createdOn: '2023-10-26T11:49:10.009Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNjlfXzE2OTgzMjA5NTAwMDk=',
  },
  {
    node: {
      id: '6001368',
      ref: 'clonedev_hd_31',
      type: 'HD',
      status: 'RECEIVED',
      totalPrice: 123.80657288601537,
      createdOn: '2023-10-26T11:02:40.463Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNjhfXzE2OTgzMTgxNjA0NjM=',
  },
  {
    node: {
      id: '6001367',
      ref: 'clonedev_hd_30',
      type: 'HD',
      status: 'RECEIVED',
      totalPrice: 219.05072690574178,
      createdOn: '2023-10-26T11:00:30.485Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNjdfXzE2OTgzMTgwMzA0ODU=',
  },
  {
    node: {
      id: '6001366',
      ref: 'clonedev_hd_29',
      type: 'HD',
      status: 'CREATED',
      totalPrice: 314.27792296314647,
      createdOn: '2023-10-26T10:46:44.858Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNjZfXzE2OTgzMTcyMDQ4NTg=',
  },
  {
    node: {
      id: '6001365',
      ref: 'clonedev_hd_28',
      type: 'HD',
      status: 'CREATED',
      totalPrice: 325.4903932162838,
      createdOn: '2023-10-26T10:39:20.467Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNjVfXzE2OTgzMTY3NjA0Njc=',
  },
  {
    node: {
      id: '6001364',
      ref: 'clonedev_cc_27C',
      type: 'CC',
      status: 'RECEIVED',
      totalPrice: 120000.0,
      createdOn: '2023-10-25T12:59:23.607Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNjRfXzE2OTgyMzg3NjM2MDc=',
  },
  {
    node: {
      id: '6001363',
      ref: 'clonedev_cc_27',
      type: 'CC',
      status: 'RECEIVED',
      totalPrice: 120000.0,
      createdOn: '2023-10-25T12:59:22.425Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNjNfXzE2OTgyMzg3NjI0MjU=',
  },
  {
    node: {
      id: '6001362',
      ref: 'clonedev_cc_26',
      type: 'CC',
      status: 'BOOKED',
      totalPrice: 120000.0,
      createdOn: '2023-10-25T12:47:54.861Z',
      customer: {
        firstName: 'demo',
        lastName: 'demo',
      },
    },
    cursor: 'Y3Vyc29yOi0tLTYwMDEzNjJfXzE2OTgyMzgwNzQ4NjE=',
  },
];

export const Default = template({
  edges: edges as Edge[],
  pageInfo: {} as PageInfo,
  page: 0,
  rowsPerPage: 25,
  disableNextButton: false,
  disablePreviousButton: true,
  onPageChange: (event: unknown, newPage: number) => console.log('newPage', newPage),
  onRowsPerPageChange: () => {},
  submitFilter: (props: any) => console.log('submitFilter', props),
});