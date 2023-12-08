declare module 'mystique/hooks/useAuth' {
    /**
     * Fluent user record from the `user` or `me` APIs.
     */
    interface MystiqueUser {
        username: string;
        firstname?: string;
        lastname?: string;
        timezone?: string;
        language?: UserLanguage;
        attributes?: UserAttribute[];
        roles: UserRole[];
    }

    /**
     * Attributes assigned to the user
     */
    interface UserAttribute {
        name: string;
        type: string;
        value: unknown;
    }

    /**
     * User Language setting.
     */
    interface UserLanguage {
        /**
         * User-facing label of the language
         */
        label: string;
        /**
         * IETF BCP 47 Language Tag (e.g. en-AU)
         */
        value: string;
    }

    /**
     * A context in which a user has been granted a role.
     */
    export interface UserRoleContext {
        /**
         * Context level at which the role is granted.
         */
        contextType: MystiqueContextLevel;
        /**
         * Context ID at which the role is granted.
         */
        contextId: string;
        /**
         * User-facing name of the context (e.g. account/retailer/location name)
         */
        label?: string;
        /**
         * Extra details for the role context, like ref and location address.
         */
        details?: Record<string, any>;
    }

    /**
     * Allocation of a Fluent role to a User
     */
    interface UserRole {
        /**
         * The role that's allocated
         */
        role: FluentRole;
        /**
         * One or more contexts at which the user has the role.
         */
        contexts: UserRoleContext[];
    }

    /**
     * Fluent API role
     */
    interface FluentRole {
        /**
         * Name of the role
         */
        name: string;
    }

    /**
     * The different levels at which a Fluent user may be granted a role.
     */
    export type MystiqueContextLevel = 'account' | 'retailer' | 'location';

    /**
     * Details of the logged in user and session
     */
    export type MystiqueAuth = {
        /**
         * True if the user is logged in (will always be the case for plugin components)
         */
        loggedIn:true,
        /**
         * Log the user out (throw back to login screen)
         */
        logout:() => void,
        /**
         * Details of the logged in user
         */
        user:MystiqueUser,
        /**
         * Details of the login context (retailer or location)
         */
        context: MystiqueAuthContext
    };

    /**
     * Details of the login context (retailer or location)
     */
    interface MystiqueAuthContext {
        /**
         * Whether the app login context is at the account, retailer, or location level
         */
        level: MystiqueContextLevel;
        /**
         * The currently selected login context for this session.
         */
        current: UserRoleContext;
        /**
         * Other login contexts available to this user at the app context level.
         */
        available: UserRoleContext[];
        /**
         * Change the session context to one of the other available values.
         * @param context any UserRoleContext in the 'available' array.
         */
        set: (context: UserRoleContext) => void;
        /**
         * Check whether the current user has a given role or set or roles in the app context.
         * @param role name or list of names to check access against.
         * @returns RoleCheckResult with hasRole=true if the user has _any_ role in the app context.
         */
        roleCheck: (role: string | string[]) => RoleCheckResult;
    }

    /**
     * Whether the role check was a success, and which role matched.
     */
    interface RoleCheckResult {
        /**
         * True if the role check was a success.
         */
        hasRole: boolean;
        /**
         * If hasRole is true, the first role that matched successfully.
         */
        context?: UserRoleContext;
    }

    /**
     * Retrieve the auth information of the currently logged in user.
     */
    export const useAuth: () => MystiqueAuth;
}

declare module 'mystique/hooks/useEnv' {
    /**
     * Get details of the currently running Fluent Account and App
     */
    export const useEnv: () => {
        /**
         * The Fluent Account name
         */
         account: string
         /**
          * The current app name
          */
         app: string
    }
}

declare module 'mystique/hooks/useI18n' {
    /**
     * State of the available and selected languages.
     */
    interface I18nLanguageState {
        /**
         * ISO code of the currently selected language.
         */
        current: string;
        /**
         * Full list of languages (ISO code + label) configured on the account.
         * Based on the `i18n.languages` account setting.
         */
        available: Array<{ code: string; label: string; }>;
        /**
         * Change the current language.
         *
         * @param code the ISO code of one of the available languages.
         */
        setLanguage: (code: string) => void;
    }

    /**
     * Wrapper for i18n functions.
     */
    interface I18nHook {
        /**
         * Take an i18n key (e.g. 'fc.mystique.sidebar.welcome') and return a value translated
         * into the user's language.
         *
         * @remarks
         * Some translation keys reference values that require additional parameters to render.
         * For example, the English value of 'fc.mystique.sidebar.welcome' is "Hi, {{username}}".
         * This means that the variables should include a key named 'username'.
         *
         * @param key string value of the translation key (must be present in translation files or settings)
         * @param variables key/value map of variables to be used in the translation.
         */
        translate: (key: string, variables?: Record<string, any>) => string;
        /**
         * Attempt to translate multiple keys and return the first match.
         *
         * @remarks
         * If no key matches a translated value, the literal value of the key will be returned.
         * This can be used to translate with a default, e.g. `['fc.key1', 'fc.key2', 'Submit']`
         *
         * @param keys array of i18n keys to attempt.
         * @param context values to be used in translation strings.
         */
        translateOr: (keys: string | string[], context?: Record<string, any>) => string;
        /**
         * Attempt to translate multiple keys and return the first match.
         * Translate a key if it matches the prefix "i18n:" criteria.
         *
         * @remarks
         * If no key matches a translated value, the literal value of the key will be returned.
         * This can be used to translate with a default, e.g. `['fc.key1', 'fc.key2', 'Submit']`
         *
         * @param keys array of i18n keys to attempt.
         * @param context values to be used in translation strings.
         */
        prefixedTranslate: (keys: string | string[], context?: Record<string, any>) => string;
        /**
         * Retrieve and update the current and available languages.
         */
        language: I18nLanguageState;
    }

    /**
     * Use Mystique i18n functionality to translate UI strings into the user's language.
     *
     * @remarks
     * This should primarily be used for static strings, like 'cancel' or 'submit' buttons.
     * Most text in a component should be configurable via the manifest, which will automatically
     * translate values before they reach the component.
     *
     * @returns I18Hook value containing translation features.
     */
    export const useI18n: () => I18nHook;
}

declare module 'mystique/hooks/useSettings' {
    import {OkQueryResponse} from 'mystique/types/common';
    import {CombinedError} from 'mystique/hooks/useQuery';

    /**
     * Name and value pair of a Fluent Account setting.
     */
    interface ApiSetting {
        /**
         * Name of the setting
         */
        name: string;
        /**
         * Value of the setting. Structure will depend on the setting.
         * This value field will map to the setting value if present, else the lobValue, else null.
         */
        value: any;
    }

    /**
     * Response status, plus the setting value when status is 'ok'.
     */
    type Setting = {
        status: 'loading';
        result?: ApiSetting;
    } | OkQueryResponse<ApiSetting> | SettingError;
     
    /**
     * The setting response when an error occurs. 
     */
     export type SettingError = SettingErrorCombinedErr | SettingErrorString | SettingErrorNoResult;

     /**
      * The setting error type when no result is given
      */
     type SettingErrorNoResult = {
       status: 'error';
       resultType: 'None';
     }
     
     /**
      * The setting error structure when result is a string
      */
     type SettingErrorString = {
       status: 'error';
       result: string;
       resultType: 'string';
     }
     
     /**
      * The setting error structure when result is a combined error
      */
     type SettingErrorCombinedErr = {
       status: 'error';
       result?: CombinedError;
       resultType: 'CombinedError';
     }

    /**
     * Key/value pair representing a settings request.
     * Value is the setting name and key is the value to map it to on the response.
     */
    type SettingRequest = {
        [key: string]: string;
    };

    /**
     * Settings response that mirrors the setting request, only values have been swapped with
     * Setting objects.
     */
    type SettingResponse<T> = {
        [P in keyof T]: Setting;
    };

    /**
     * Retrieve Fluent account settings as a hook.
     *
     * @remarks
     * This hook is designed to retrieve multiple settings in one request, and to
     * respond with an object that mirrors the structure of the req parameter.
     *
     * For example, when requesting with:
     *  { "types":"order.types", "statuses":"order.statuses" }
     * The response would be:
     *  { "types":<Setting>, "statuses":<Setting> }
     *
     * @param req SettingRequest mapping response names to setting keys.
     * @returns SettingResponse map from req keys to the resulting Setting objects.
     */
    export const useSettings: <T extends SettingRequest>(req: T) => SettingResponse<T>;
}

declare module 'mystique/hooks/getSettings' {
    import {SettingRequest, SettingResponse} from 'mystique/hooks/useSettings';

    /**
     * Promise-based variant of `useSettings`.
     *
     * @remarks
     * GetSettings should be used in cases where the settings names must be generated on the fly,
     * state must be managed by the component. Use useEffect(...) to prevent making unnecessary
     * extra calls.
     *
     * @param req SettingRequest mapping response names to setting keys.
     * @returns SettingResponse map from req keys to the resulting Setting objects.
     */
    export const getSettings: <T extends SettingRequest>(req: T, retailerId?: number, locationId?: number) => Promise<SettingResponse<T>>;
}

declare module 'mystique/hooks/useQuery' {
    import {DocumentNode, GraphQLError} from 'graphql';

    /**
     * Error response from the GQL server.
     */
    export class CombinedError extends Error {
        /**
         * Error message for the API call.
         */
        message: string;
        /**
         * Errors array from the GQL response body.
         */
        graphQLErrors: GraphQLError[];
        /**
         * Response body of the API call. Structure will depend on the nature of the error.
         */
        response?: any;
    }

    /**
     * GraphQL Query State
     */
    export interface UseQueryState<Data = any> {
        /**
         * True if the query is still waiting for server response
         */
        fetching: boolean;
        /**
         * True if the response value was fetched from cache.
         */
        stale: boolean;
        /**
         * Resulting data from the GQL response. Structure will vary depending on the query.
         */
        data?: Data;
        /**
         * Any errors received from the GQL server.
         */
        error?: CombinedError;
    }

    /**
     * Array containing the query state (fetching status and resulting data) and re-fetch function.
     */
    export type UseQueryResponse<Data = any, Variables = object> = [
        UseQueryState<Data>,
        () => void
    ];

    /**
     * Make a query on the Fluent GQL API as a hook.
     *
     * @remarks
     * For performance reasons, prefer using data from the page-level query defined in the manifest.
     * This is for those cases where extra stitching or user-interactions are necessary.
     *
     * @param query GQL query to execute, either as a string, or using the `gql` template.
     * @param variables key/value pairs to be used by the query.
     * @returns UseQueryResponse<T> containing the query response and a re-fetch function. Retrieve as [result, refetch] = useQuery(...).
     */
    export const useQuery: <T, >(query: string | DocumentNode, variables?: Record<string, any>) => UseQueryResponse<T>;
}

declare module 'mystique/hooks/getQuery' {
    import {CombinedError} from 'mystique/hooks/useQuery';
    import {DocumentNode} from 'graphql';

    /**
     * Result of a GraphQL query.
     */
    export interface OperationResult<Data = any> {
        /**
         * Resulting data from the GQL response. Structure will vary depending on the query.
         */
        data?: Data;
        /**
         * Any errors received from the GQL server.
         */
        error?: CombinedError;
    }

    /**
     * Make a query on the Fluent GQL API as a Promise.
     *
     * @remarks
     * For performance reasons, prefer using data from the page-level query defined in the manifest.
     * This is for those cases where extra stitching or user-interactions are necessary.
     *
     * GetQuery should be used in cases where a query must be generated on the fly, state must be managed
     * by the component. Use useEffect(...) to prevent making unnecessary extra calls.
     *
     * @param query GQL query to execute, either as a string, or using the `gql` template.
     * @param variables key/value pairs to be used by the query.
     * @returns Promise<OperationResult<T>> resolving to the query response after load.
     */
    export const getQuery: <T, >(query: string | DocumentNode, variables?: Record<string, any>) => Promise<OperationResult<T>>;
}

declare module 'mystique/hooks/useRest' {
    import {QueryResponse} from 'mystique/types/common';

    /**
     * Response status, plus the HTTP response body when status is 'ok'.
     */
    type RestResponse<T> = QueryResponse<T>;

    /**
     * Make an authenticated REST call against the Fluent API as a hook.
     *
     * @remarks
     * The Account-based Fluent API domain is assumed, so endpoint should begin after the domain,
     * e.g. `getRest('/api/v4.1/event/sync', 'POST', eventBody)`.
     *
     * @param endpoint URI path of the REST call
     * @param method HTTP method GET or POST (default is 'GET')
     * @param body HTTP body for POST calls
     * @returns RestResponse result that will update after load.
     */
    export const useRest: <T, >(endpoint: string, method?: 'GET' | 'POST', body?: any) => RestResponse<T>;
}

declare module 'mystique/hooks/getRest' {
    /**
     * Make an authenticated REST call against the Fluent API as a Promise.
     *
     * @remarks
     * The Account-based Fluent API domain is assumed, so endpoint should begin after the domain,
     * e.g. `getRest('/api/v4.1/event/sync', 'POST', eventBody)`.
     *
     * GetRest should be used in cases where a query must be generated on the fly, state must be managed
     * by the component. Use useEffect(...) to prevent making unnecessary extra calls.
     *
     * @param endpoint URI path of the REST call
     * @param method HTTP method GET or POST (default is 'GET')
     * @param body HTTP body for POST calls
     * @returns Promise that resolves with the HTTP response body after load.
     */
    export const getRest: <T, >(endpoint: string, method?: 'GET' | 'POST', body?: any) => Promise<T>;
}

declare module 'mystique/hooks/getApiDownload' {
    /**
     * Download an object from a Fluent API.
     *
     * @remarks
     * This is a normal fetch call except that it adds the fluent account and auth
     * headers required to access the Fluent APIs.
     *
     * Sample usage: https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
     *
     * @param endpoint API URI, e.g. `api/v4/consignment/1/labelStream`
     */
    export const getApiDownload: (endpoint: string) => Promise<Blob>;
}

declare module 'mystique/hooks/useData' {
    export interface QueryVariable {
        /**
         * Name of the query variable.
         */
        name:string;
        /**
         * GraphQL type the variable supports.
         */
        type:string;
        /**
         * Whether the variable supports multiple values.
         */
        isArray?: boolean;
    }

    interface QueryVariables {
        /**
         * Currently active query variables. These may come from a combination of URL
         * parameters, the manifest, and directly from components via the `setVariables`
         * function.
         */
        current: Record<string, any>;
        /**
         * Full set of query variables supported by the current page query. This includes
         * variables explicitly defined on the query, as well as those generated and injected
         * by Mystique for filters and pagination.
         */
        available: QueryVariable[];
        /**
         * Change the value of one or more query variables.
         *
         * @param variables name (matching available variables) and value combos.
         * @param addToUrl when true, add these variables to the URL so that navigation works.
         */
        setVariables: (variables: Record<string, any>, addToUrl?: boolean) => void;
    }

    interface DataContext {
        /**
         * Response data from the query, scoped by the current `dataSource`.
         */
        data: any;
        /**
         * The full `dataSource` from the current component and all of its ancestors.
         */
        dataSource: string[];
    }

    /**
     * Possible loading states for the page query.
     * `initial` - the query is running for the first time on this page.
     * `updating` - the query is running, but data is already available from a previous execution.
     * `ready` - the query has finished running and data is available.
     */
    type DataLoadingState = 'initial' | 'updating' | 'ready';

    /**
     * Response type of the `useData` hook.
     */
    interface UseDataResponse {
        /**
         * Current state of current and available variables on the page query.
         */
        variables: QueryVariables;
        /**
         * Contextual data for the current component, based on the `dataSource`
         * and that of its ancestors.
         *
         * This is the same `data` object that is automatically passed in to each
         * component, so usually won't need to be directly accessed.
         */
        context: DataContext;
        /**
         * The loading state of the page query. Can be used to show loading indicators.
         */
        loadingState: DataLoadingState;
    }

    /**
     * Access the current Mystique data context.
     */
    export const useData: () => UseDataResponse;
}

declare module 'mystique/hooks/useUserActions' {
    import {QueryResponse} from 'mystique/types/common';

    /**
     * Representation of the `trigger` object on a Rubix `transition` call.
     */
    export interface UserActionLookup {
        entityId: string;
        entityRef?: string;
        type: string;
        subtype: string;
        status: string;
        rootEntityId?: string;
        rootEntityRef?: string;
        rootEntityType?: string;
        retailerId: number;
        module: string;
        flexType: string;
        flexVersion: string;
    }

    /**
     * Representation of the `userAction` object on a Rubix `transition` response.
     */
    export interface UserActionInstance {
        eventName: string;
        type: 'PRIMARY' | 'SECONDARY';
        label: string;
        confirm?: boolean;
    }

    interface UserActionsResult {
        /**
         * Details of the entity that was used to look up user actions.
         */
        entity: UserActionLookup;
        /**
         * List of possible actions on the target entity, give its current status.
         */
        userActions: UserActionInstance[];
    }

    /**
     * Retrieve the available workflow user actions for the referenced entity.
     *
     * @remarks
     * By default, this will retrieve user actions for the first entity returned by
     * the first statement in the page query.
     *
     * @param path optionally provide a JSONPath to a different node in the query response.
     */
    export const useUserActions: (path?: string) => QueryResponse<UserActionsResult>;
}

declare module 'mystique/hooks/useUserActionForm' {
    import {ReactElement} from 'react';
    import { FormFieldOverride } from 'mystique/registry/FieldRegistry';

    /**
     * Different types of post-submit action.
     *
     * `navigate`:
     *    Provide a URL to navigate to after a successful action submission.
     *    This can be a template string, and won't navigate until the value
     *    renders differently before and after a page query refresh so that
     *    you can ensure the updates related to the user action are complete.
     *    This check can be disabled by passing `onlyOnChange` as `false`.
     *
     * `callback`:
     *    Provide a function to be called after a successful action submission.
     */
    export type PostSubmitType =
        | { type: 'navigate', link: string, onlyOnChange?: boolean }
        | { type: 'callback', fn: () => void };

    export interface UserActionExtension {
        /**
         * Register an action to occur after the user action is submitted.
         */
        postSubmit: PostSubmitType;
    }

    interface UseUserActionFormConfig {
        /**
         * Optionally provide a JSONPath to a different node in the query response.
         */
        path?: string;
        /**
         * Prevent form submission from producing a success toast message.
         */
        noSuccessMessage?: boolean;
        /**
         * Optional extension functionality for the user action.
         */
        extension?: UserActionExtension;
        /**
         * Optional functionality that allows you to override the properties of a form field.
         */
        overrides?: Record<string, FormFieldOverride>;
    }

    /**
     * Response value of the `useUserActionForm` hook.
     */
    interface UseUserActionFormValue {
        /**
         * Label of the user action, to be used as a card heading or button label.
         *
         * Note that this value could be an i18n string in some cases.
         */
        label: string;
        /**
         * Returns false if the user action has no fields, or all fields have set values.
         *
         * Can be used to avoid showing an empty card or drawer if there's no form to show.
         */
        hasVisibleFields: boolean;
        /**
         * Generated form to capture any data required for the user action.
         *
         * This should be rendered as a React component, e.g. `<form />`
         */
        form: ReactElement<any, any>;
        /**
         * Function to submit the user action. Values will be taken from the rendered form.
         */
        submit: () => void;
    }

    /**
     * Response type of the `useUserActionForm` hook.
     */
    export type UseUserActionFormQueryResponse = {
        status: 'loading' | 'error';
        result?: UseUserActionFormValue;
    } | {
        status: 'ok' | 'submitting';
        result: UseUserActionFormValue;
    };

    /**
     * Generate a user action form for an entity, based on the corresponding workflow configuration.
     *
     * @remarks
     * As per `useUserActions` the default target for this user action will be the first statement
     * of the page query. This can be controlled using the `config.path` property.
     *
     * @param name event name of the user action to generate.
     * @param config optional overrides for default user action behaviour.
     */
    export const useUserActionForm: (name: string, config?: UseUserActionFormConfig) => UseUserActionFormQueryResponse;
}
