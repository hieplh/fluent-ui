import { UseQueryResponse, useQuery } from 'mystique/hooks/useQuery';

export const orderQuery = `
    query getOrders(
        $first: Int
        $before: String
        $after: String
        $refs: [String]
        $type: [String!]
    ) {
        orders (
            first: $first
            before: $before
            after: $after
            ref: $refs
            type: $type
        ) {
            edges {
                node {
                    id
                    ref
                    type
                    status
                    totalPrice
                    createdOn
                    customer {
                        firstName
                        lastName
                    }
                }
                cursor
            }
        }
    }
`;

export interface OrderVariable {
  first: number;
  after: string | null;
  refs: string[] | null;
  type: string[] | null;
}

export function createOrderVariable(first?: number, after?: string, refs?: string[] | null, type?: string[] | null): OrderVariable {
  return { first: first ?? 25, after: after ?? null, refs: (refs && refs.length) ? refs : null, type: (type && type.length) ? type : null };
}

export function GetOrders<T>(query: string, variable: any): UseQueryResponse<T> {
  return useQuery<T>(query, variable);
}
