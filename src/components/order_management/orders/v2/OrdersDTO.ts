import { OperationResult } from 'mystique/hooks/getQuery';

export interface Customer {
  firstName: string | null;
  lastName: string | null;
}

export interface Order {
  id: string;
  ref: string;
  type: string;
  status: string;
  totalPrice: number | null;
  createdOn: string;
  customer: Customer;
}

export interface Edge {
  node: Order;
  cursor: string;
}

export interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface Orders {
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface OrderQueryResponse extends OperationResult {
  orders: Orders;
}
