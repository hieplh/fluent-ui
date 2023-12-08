// utility functions

declare module 'mystique/frame' {
    interface ModalAction {
        /**
         * Label to be shown on the action button. Supports i18n keys.
         */
        label: string;
        /**
         * Action to be performed on clicking the button.
         */
        action: () => void;
    }

    /**
     * Type definition for Modal and Drawer instances.
     */
    export interface ModalContent {
        /**
         * Main heading of the Modal/Drawer.
         */
        title?: string | JSX.Element;
        /**
         * Buttons to appear in the Modal (at the bottom) or Drawer (at the top).
         */
        actions?: ModalAction[] | JSX.Element;
        /**
         * Body content to be rendered inside the Modal/Drawer.
         */
        body: JSX.Element | JSX.Element[];
    }
}

declare module 'mystique/frame/DataModal' {
    import { FC } from 'react';
    import { MystiqueComponentInstance } from 'mystique/types/manifest';

    interface DataModalProps {
        /**
         * Manage variables to be passed in to the query
         */
        query: string;
        /**
         * The components to display on the page.
         * Refer to individual component documentation for more details.
         */
        descendants: MystiqueComponentInstance[];
    }

    /**
     * This is a modal component that performs its own query (like the page) and provides
     * its own data context so that descendants can read from and update the query.
     */
    export const DataModal: FC<DataModalProps>;
}

declare module 'mystique/frame/pushDrawer' {
    import { ModalContent } from 'mystique/frame';

    /**
     * Have Mystique render a Drawer object.
     *
     * @remark
     * Drawers should typically be used to gather data (e.g. User Action forms) or to show
     * additional data related to the content on the page (e.g. event data).
     *
     * @param content the title, actions and body content to be shown in the Drawer.
     */
    export const pushDrawer: (content: ModalContent) => void;

    /**
     * Close any Drawers that are showing.
     */
    export const clearDrawers: () => void;
}

declare module 'mystique/frame/pushModal' {
    import { ModalContent } from 'mystique/frame';

    /**
     * Have Mystique render a Modal object.
     *
     * @remark
     * Modals should typically be used when requiring the user to confirm an action before
     * continuing.
     *
     * @param content the title, actions and body content to be shown in the Modal.
     */
    export const pushModal: (content: ModalContent) => void;

    /**
     * Close any Modals that are showing.
     */
    export const clearModals: () => void;
}

declare module 'mystique/frame/pushToast' {
    /**
     * Severity will determine the colour and icon shown in a toast message.
     */
    export type ToastSeverity = 'success' | 'info' | 'warning' | 'error';

    /**
     * Have Mystique render a Toast object.
     *
     * @remark
     * Toasts should typically be used to show the user some temporary information that
     * they do not need to interact with, e.g. a success or error after posting a form.
     *
     * @param severity level of the toast message
     * @param content value to display in the toast (text values are recommended)
     * @param autoHideDuration how long to show the toast in ms (default 8000)
     */
    export const pushToast: (
        severity: ToastSeverity,
        content: JSX.Element | string,
        autoHideDuration: number,
    ) => void;
}
