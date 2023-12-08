/** See Lingo for documentation.
 * https://lingo.fluentcommerce.com/configure/ux/ui-builder/config-guide/
 */
 declare module 'mystique/types/manifest' {

    /**
     * The Mystique UX Framework delivers configuration based solution implementation for UIs. Configuration is managed in a JSON document called the Mystique Manifest.
     */
    export interface MystiqueManifest {

        /**
         * Version of the Mystique Manifest schema. At present, this should always be set to 2.0
         */
        manifestVersion: '2.0';

        /**
         * Name of the app used in logs and when filtering user actions.
         */
        name: string;

        /**
         *  The icon associated with this web app.
         */
        icon?: string;

        /**
         *  Name of the app used in visible locations (app header, browser title bar etc). Since this is end-user visible, it should be translated via i18n.
         */
        title: string;

        /**
         * Enables us to rename 'servicepoint' to 'store' without changing all the workflows.
         */
        orchestrationAlias?: string;

        /**
         * Defines the context of this app, either retailer (ala Console) or location (ala ServicePoint) level.
         * It also takes an optional "role" property to restrict access to users who have been granted a particular role at the give level.
         */
        context?: MystiqueManifestRole;	// default: {level:'retailer'}

        /**
         * Defines the Mystique SDK plugins to load while rendering this app.
         */
        plugins?: MystiquePlugin[];

        /**
         * The initial page to load on login, or whenever no other page is referenced in the URL.
         */
        homePath: string;

        /**
         * The pages available in this app
         */
        routes: MystiqueManifestRoute[];
    }

    /**
     * The fragment is a cut-down version of a full manifest, in that it defines additional sections and pages that
     * will appear in the app navigation in the position where the reference was included in the original manifest.
     * The fragment should simply define the manifestVersion, and a routes array.
     */
    export interface MystiqueManifestFragment {

        /**
         * Version of the Mystique Manifest schema. At present, this should always be set to 2.0.
         */
        manifestVersion: '2.0';

        /**
         * The pages available in this app
         */
        routes: Array<MystiqueSection | MystiquePage>;
    }

    export type MystiqueManifestRoute = MystiqueFragmentReference | MystiqueSection | MystiquePage;

    export type MystiqueContextLevel = 'account' | 'retailer' | 'location';

    /**
     * Defines the context of this app, either retailer (aka Console) or location (aka ServicePoint) level.
     * It also takes an optional "role" property to restrict access to users who have been granted a particular role at the give level.
     */
    export interface MystiqueManifestRole {

        /**
         * @default 'retailer'
         */
        level: MystiqueContextLevel;

        /**
         * Name of the Role
         */
        role?: string | string[];
    }

    /**
     *  Defines the Mystique SDK plugins to load while rendering this app.
     */
    type MystiquePlugin = { type: 'setting', setting: string } | { type: 'url', name?: string, src: string };

    /**
     * A section is a group of pages that are nested under a single header in the nav sidebar.
     */
    export interface MystiqueSection {

        /**
         * Defines this route as a section.
         */
        type: 'section';

        /** The URL for this page.
         * This URL can optionally include parameters, which may then be used in the GraphQL query and/or page components.
         * Parameters are denoted with a colon, for example, when visiting a page with a path of "/orders/:id" as "/orders/123",
         * the value id = 123 would be available to be used in the page query to retrieve the corresponding Order.
         */
        path?: string;

        /**
         * If present, users must have at least one of the roles defined in the context of the app (retailer or location) to be able to access the section.
         * Specifically, on failed role check all pages will disappear from nav and show 404 if directly navigated to via the URL.
         */
        roles?: string[];

        /**
         * Icon and label for this section in the sidebar nav.
         */
        nav: MystiqueNavConfig;

        /**
         * Pages within this section
         */
        pages: MystiquePage[];
    }

    type MystiqueFragmentReference = {
        type: 'reference'
        settingName: string
    };

    export interface MystiqueComponentInstance {

        /**
         * Data from query to use on the page
         */
        dataSource?: string;

        /**
         * If present, users must have at least one of the roles defined in the context of the app (retailer or location) to be able to access the page.
         */
        roles?: string[];

        /**
         * Name of component to display data
         */
        component: string;

        /**
         * The components to display on the page.
         * Refer to individual component documentation for more details.
         */
        descendants?: MystiqueComponentInstance[];

        /**
         * The component props to be passed in to the component.
         * These will differ depending on the component, so refer to individual component documentation for more details.
         */
        props?: Record<string, any>;
    }

    export interface MystiquePage extends MystiqueComponentInstance {

        /*
         * Defines this route as a page.
         */
        type: 'page';

        /** The URL for this page.
         * This URL can optionally include parameters, which may then be used in the GraphQL query and/or page components.
         * Parameters are denoted with a colon, for example, when visiting a page with a path of "/orders/:id" as "/orders/123",
         * the value id = 123 would be available to be used in the page query to retrieve the corresponding Order.
         */
        path: string;

        /**
         * Optional configuration for this page in the navigation page.
         * If there is no nav defined for a given page it won't appear in the sidebar, but will still be accessible via URL. This is common for pages that require parameters, such as the individual Order page "/order/123".
         * Label is user-facing and should use a translatable i18n key.
         */
        nav?: MystiqueNavConfig;

        /**
         * If present, the defined query will be executed before rendering the page, and the resulting data made available to the page and it's descendants.
         * More information is available here: https://lingo.fluentcommerce.com/configure/ux/ui-builder/config-guide/
         */
        data?: GQLQuery;

        fullScreen?: boolean;

        /**
         * The component props to be passed in to the page component.
         */
        props?: MystiquePageProps;
    }

    /**
     * Template strings will always produce a string value, and there are some cases where GraphQL requires a non-string variable.
     * For such cases, you can tell Mystique to parse the value using JSON.parse by providing an object following the second code example.
     */
    export interface ConvertableVariable {
        value: string;
        parse: true;
    }

    export interface GQLQuery {

        /**
         * GQL query string
         */
        query: string;

        /**
         * Variables to be used in the GQL query
         */
        variables?: Record<string, ConvertableVariable | any>;
    }

    /**
     * Configure which user action buttons are shown or hidden at the top of the page
     */
    export interface UserActionFilter {
        type: 'include' | 'exclude';
        names: string[];
    }

    /**
     * Enables configuration of what happens after a successful form submission, either 'navigate' to a new page,
     * or provide a custom callback that can perform other functionality
     */
    export type PostSubmitType =
        | { type: 'navigate', link: string }
        | { type: 'callback', fn: () => void };

    /**
     * Give some control over how User Actions work from the workflow
     */
    export interface UserActionExtension {
        postSubmit: PostSubmitType;
    }

    /**
     * Groups the UserActionFilter/UserActionExtension defined above
     */
    export interface PageActionConfig {
        userActionFilter?: UserActionFilter;
        userActionExtensions?: Record<string, UserActionExtension>;
        primary?: {};
        secondary?: {};
    }

    /**
     * Standard component props for MystiquePage
     */
    interface MystiquePageProps extends Record<string, any> {
        title: string;
        actions?: PageActionConfig | true;
    }

    /**
     * Configuration for this page in the navigation page.
     * If there is no nav defined for a given page it won't appear in the sidebar, but will still be accessible via URL.
     * This is common for pages that require parameters, such as the individual Order page "/order/123".
     */
    interface MystiqueNavConfig {

        /**
         * Text to show in the nav section
         * Label is user-facing and should use a translatable i18n key.
         */
        label: string;

        /**
         * Icon in the sidebar nav
         */
        icon: string;
    }
}