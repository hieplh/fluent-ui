// common interfaces

declare module 'mystique/types/common' {
    /**
     * Indicator type to show when string parameters will be auto-translated
     */
    export type TranslatableString = string;

    /**
     * Common pattern for async responses, e.g. waiting for a Settings load.
     * @param T the expected type of the result object.
     */
    export type QueryResponse<T> = {
        /**
         * When status is 'loading', the request is still pending.
         * When status is 'error', the request has completed but unsuccessfully.
         */
        status: 'loading' | 'error';
        /**
         * Result of the request, optional when status is 'loading' or 'error'.
         */
        result?: T;
    } | OkQueryResponse<T>;

    /**
     * A successful QueryResponse.
     */
    export interface OkQueryResponse<T> {
        /**
         * When status is 'ok', the request has completed successfully.
         */
        status: 'ok';
        /**
         * Result of the request, guaranteed when status is 'ok'.
         */
        result: T;
    }

    /**
     * Helper interface for typing Connections in GQL responses.
     *
     * @remark
     * This type is a shortcut for typing connection-based GQL responses in Typescript.
     *  e.g. `useQuery<{ orders: Connection<Order>; }>(ordersQuery);`
     */
    export interface Connection<T> {
        edges: Edge<T>[];
    }

    /**
     * Helper interface for typing Connection Edges in GQL responses.
     */
    export interface Edge<T> {
        node: T;
    }
}
