
declare module 'mystique/components/Card' {
    import {FC} from 'react';

    /**
     * Button configuration for a Card.
     */
    interface CardAction {
        /**
         * Human-readable label for the button. Will be auto-translated if it's an i18n key.
         */
        label: string;
        /**
         * Function to be called when the button is clicked.
         */
        action: () => void;
    }

    /**
     * User-friendly names for common Card widths.
     */
    export type NamedCardWidth = 'quarter' | 'third' | 'half' | 'two-thirds' | 'full';
    /**
     * All card widths accepted by the Card component. Numbers correspond to a 12-column grid.
     */
    export type CardWidth = NamedCardWidth | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

    /**
     * Props for the Card component.
     */
    interface CardProps {
        /**
         * Title to appear at the top of the card.
         */
        title?: string;
        /**
         * Colour of the bar across the top of the card. Typically used for dashboard tiles.
         */
        highlight?: string;
        /**
         * Buttons and their actions to appear at the bottom of the card.
         */
        actions?: CardAction[];
        /**
         * Card width on a 12-column grid. At mobile breakpoints all cards default to 12.
         */
        width?: CardWidth;
    }

    /**
     * A Mystique Design Language themed variant of the Material UI Card.
     */
    export const Card: FC<CardProps>;
}

declare module 'mystique/components/CardContent' {
    import {FC} from 'react';

    /**
     * Render content within a Card with the proper padding.
     *
     * @remarks
     * Don't use for items that _should_ go to the edge of the Card, like tables or maps.
     */
    export const CardContent: FC;
}

declare module 'mystique/components/Children' {
    import {FC} from 'react';
    import {MystiqueComponentInstance} from 'mystique/types/manifest';

    /**
     * Props for the Children component
     */
    interface ChildrenProps {
        /**
         * Optionally only render the child at the given index (default is all).
         * Used for cases like tab sets that need to conditionally render children.
         */
        index?: number;
        /**
         * Optionally reset the data context for descendants of this component.
         * This can be used to run a second query and make that available to children.
         */
        dataOverride?: any;
        /**
         * Optionally reset the descendants of this component.
         * This can be used to manually filter the configured descendants, or to allow
         * descendants to be configured as component parameters for cases where a single
         * pool of descendants isn't flexible enough.
         */
        descendantsOverride?: MystiqueComponentInstance[];
    }

    /**
     * Render the descendants of this component as defined in the manifest.
     *
     * @remarks
     * Unlike typical React components, the children of a Mystique components won't usually
     * be passed directly in as a prop. This is because there's a series of other checks and
     * balances Mystique will do before rendering them (checking roles, setting data context,
     * injecting props from the manifest, etc) that every individual component needn't have
     * to consider.
     *
     * All of that to say: the usual `{children}` call is replaced by `<Children />`.
     */
    export const Children: FC<ChildrenProps>;
}

declare module 'mystique/components/DynamicValue' {
    import {FC} from 'react';
    import {MystiqueComponentInstance} from 'mystique/types/manifest';

    /**
     * Configuration options for `component`-type attributes.
     *
     * This is essentially just a typical component configuration you'd see in
     * a manifest, but is a separate interface as it may evolve to have extra
     * options later on.
     */
    interface ComponentOptions extends MystiqueComponentInstance {}

    /**
     * Style option for a `standard`-type attribute.
     */
    interface TextStyle {
        /**
         * Choose the value against which this style will be compared.
         *
         * This is a template string, so can produce a value from the context data.
         *
         * Setting a value on the style is optional as the default is the rendered
         * `value` string from the attribute itself.
         */
        value?: string;
        /**
         * If any string in the `matches` array is equal to the `value`, then this
         * style is applied and all others ignored.
         *
         * If undefined this style will match every value (like a `default` case in
         * a `switch` block). The `default` case should always come last.
         */
        matches?: string | string[];
        /**
         * Optionally show an icon before the text.
         */
        icon?: {
            /**
             * The `name` can be any icon name supported by Mystique (e.g. `MdTick`).
             * See Lingo for reference.
             *
             * If the name is set to `loading` a circular loading spinner will be
             * displayed instead to indicate that something is in progress. Avoid
             * putting too many of these on a page as they can be CPU intensive.
             */
            name: 'loading' | string,
            /**
             * Set the colour of the icon. This supports either named colours from the
             * theme (e.g. `primary`) or a CSS hex value (e.g. `#AABBCC`).
             *
             * Prefer named colours when possible to support themeability.
             */
            colour?: string,
            /**
             * Alternate spelling of the `colour` property.
             */
            color?: string
        };
        text?: {
            /**
             * Set the colour of the text. This supports either named colours from the
             * theme (e.g. `primary`) or a CSS hex value (e.g. `#AABBCC`).
             *
             * Prefer named colours when possible to support themeability.
             */
            colour?: string,
            /**
             * Alternate spelling of the `colour` property.
             */
            color?: string
        };
    }

    /**
     * Configuration options for `standard`-type attributes.
     */
    interface TextOptions {
        /**
         * Apply styling to text-based attributes.
         *
         * Styles are configured in an array from highest to lowest priority. When
         * rendering a text attribute, the first matching style (see `TextStyle`) is
         * applied and all others are ignored.
         */
        styles?: TextStyle[];
    }

    /**
     * Configuration options for `image`-type attributes.
     */
    interface ImageOptions {
        noModal?: boolean;
        width?: number;
        height?: number;
        alt?: string;
    }

    /**
     * Attribute to be rendered in a DynamicValue.
     *
     * These are often mapped directly from manifest configurations, to give
     * app configurers control over mapping query data into field or column values.
     */
    export interface DynamicAttribute {
        /**
         * Whether to treat the value as an image source or a normal string.
         */
        type?: DynamicAttributeType;
        /**
         * Human-readable label for the attribute.
         * Not actually used by DynamicValue but often used by the parent component to label
         * a field or column in which the value is shown.
         */
        label?: string;
        /**
         * Input to be parsed by the Template Renderer as the output value.
         * This may contain mustache functions and reference context values,
         *  e.g. "{{capitalise node.status}}"
         */
        value?: string;
        /**
         * Input to be parsed by the Template Renderer as the href of a link to be wrapped around the value.
         * This may also contain mustache functions and reference context values,
         *  e.g. "/orders/{{node.id}}"
         */
        link?: string;
        /**
         * Optional extension configurations for this attribute.
         *
         * When provided, the options type should match the attribute type (`standard` === `TextOptions`).
         */
        options?: TextOptions | ImageOptions | ComponentOptions;
    }

    export type DynamicAttributeType = 'standard' | 'image' | 'component';

    /**
     * Properties for the DynamicValue component.
     */
    interface DynamicValueProps {
        /**
         * Dynamic attribute to be parsed.
         */
        attribute: DynamicAttribute;
        /**
         * Context data to be made available to the TemplateRenderer.
         * Typically the standard component 'data' object.
         */
        context: any;
        /**
         * A JSX node to return if the template renders nothing.
         * e.g. <span>-</span> to display a dash when a card field is empty.
         */
        defaultValue?: React.ReactElement;
    }

    /**
     * Render a string value with the TemplateRenderer. Usually used with manifest values
     * to allow configured query data to be shown in components.
     */
    export const DynamicValue: FC<DynamicValueProps>;
}

declare module 'mystique/components/Loading' {
    import {FC} from 'react';

    /**
     * The Loading component shows a Mystique-themed loading animation over the calling component.
     *
     * @remarks
     * Loading puts a semi-opaque background over the parent component and is absolutely positions,
     * so should be placed within a `position:relative` container. If the component is an implementation
     * of Card this is already accounted for.
     */
    export const Loading: FC;
}

declare module 'mystique/components/List' {
    import { FC } from 'react';
    import { CardWidth } from 'mystique/components/Card';
    import { MystiqueComponentInstance } from 'mystique/types/manifest';
    import { DynamicAttribute } from 'mystique/components/DynamicValue';
    import { MystiqueThemeColours } from 'mystique/services/Theme';

    export interface ListProps {
        /**
         * The title of the list
         */
        title?: string;
        /**
         * A coloured highlight bar that's placed at the top of the list. The value is a hex value of a colour
         */
        highlight?: keyof MystiqueThemeColours | string;
        /**
         * The width of the component
         */
        width?: CardWidth;
        /**
         * THe actions to attribute to the list
         */
        actions?: ListAction[];
        /**
         * The columns of the list
         */
        attributes: ListColumn[];
        /**
         * How to display the list in mobile view. Can either display each row as an actual table row or as individual cards.
         */
        responsiveness?: 'table' | 'card';
        /**
         * Configuration for a row in the table
         */
        row?: ListRowConfig;
        /**
         * Configuration for setting a filter on the list
         */
        filter?: ListFilterConfig;
        /**
         * Configuration for the density of the rows. This controls the height of each row.
         */
        density?: {
            /**
             * If set to true, a button group will show up that enables toggling between the two density states
             */
            toggle?: boolean;
            /**
             * The initial value of the row density
             */
            initial?: 'compressed' | 'standard';
        };

        /**
         * The default number of rows to show on each page
         */
        defaultPageSize: number;
        /**
         * A list of 'rows per page' options that the user can select. Each option represents an option the user can select to choose
         * the number of rows to display on each page.
         */
        rowsPerPageOptions?: number[];
        /**
         * The data provided for the list
         */
        data: any;
        /**
         * A string that defines the link for a row. This can be configured per row using a templated string.
         * @remark this will eventually be moved into row.link
         */
        rowLink?: string;
        /**
         * The component for each row.
         * @remark this will eventually be moved into the row
         */
        rowComponent?: MystiqueComponentInstance; // to be deprecated, move to row.replacement
    }

    /**
     * Configuration for a list action
     */
    type ListAction = {
        type: 'UserAction';
        /**
         * The name of the user action
         */
        name: string;
    };

    /**
     * Configuration for the list
     */
    interface ListFilterConfig {
        /**
         * If set to true, the filter control will be enabled. The filterable properties are taken from the variables that can be used
         * in top-most query in the graphql data. However, it will only show that property if there is a registered field for that variable type.
         * Furthermore, the following variables are automatically excluded: 'first', 'last', 'before', 'after', 'workflowref', 'workflowversion'
         */
        enabled: boolean;
        /**
         * A list of properties to exclude from the list of filterable properties.
         */
        exclude?: string[];
    }

    /**
     * Column configuration settings. In addition to all properties available to attributes, a list column can also take specific properties
     * to alter the display of the column
     */
    type ListColumn = DynamicAttribute & {
        /**
         * If specified, this column will not show up below the specified media breakpoint.
         */
        hideBelow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
        /**
         * If specified, this column will not show up above the specified media breakpoint.
         */
        hideAbove?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
        /**
         * This property specifes the horizontal alignment of the column's contents. If not specified, defaults to left.
         */
        align?: 'left' | 'centre' | 'center' | 'right';
    };

    /**
     *  Row configuration settings. This contains configurations for customising the display for a row.
     */
    export interface ListRowConfig {
        /**
         * If specified, this component will be shown below each row.
         */
        expansion?: MystiqueComponentInstance;
      }

    /**
     *  A mystique themed List component used to display a list of items.
     */
    export const List: FC<ListProps>;
}

declare module 'mystique/components/QuantityList' {
    import { FC } from 'react';
    import { ListColumn, ListProps } from 'mystique/components/List';
    import { FormFieldProps } from 'mystique/registry/FieldRegistry';
    import { MystiqueThemeColours } from 'mystique/services/Theme';

    export type QuantitySelectorProps = FormFieldProps<QuantitySelectorEvent> & {
        /**
         * The validation settings for the quantity selector
         */
        validation?: QuantitySelectorValidation;
        /**
         * The data source for the quantity selector. This works the same way as a Mystique Component Instance's dataSource property.
         */
        dataSource?: string;
        /**
         * An optional feature where you define whether the data passed into the quantity selector is valid or not. <br/>
         * With this feature, you can instead display a string instead of the component when the data is not valid for a quantity selector. <br/>
         * 
         * This is separate from the validation prop which is used for validating user input only.
         */
        itemValidation?: {
            /**
             * The condition to check whether or not the item is valid or not. This should be a templated string that resolves to a boolean.
             * For example, if you want to check that the amount of quantity is greater than zero before showing the quantity selector you can 
             * use {{gt orderItem.quantity 0}}.
             */
            condition: string;
            /**
             * If the data for this quantity selector is invalid according to isValid, this message will be displayed instead of the
             * quantity selector component. This can be an i18n string. If the key is not found, or this is not provided, then the component defaults
             * to using the error 'Invalid Item'
             */
            messageOnInvalid?: string;
        };
        /**
         * An optional label that's shown below the quantity selector. This is a separate label from the general label passed into the FormField label.
         * If this isn't provided, a label will not be shown.
         */
        underLabel?: {
            /**
             * The value of the label. This can be an i18n key. If not found, it defaults to showing the string 'of {{max}}'
             */
            string: string;
            /**
             * Optional styling options for the label under the quantity selector.
             */
            options?: UnderLabelOptions;
        };
    }

    export interface QuantitySelectorValidation {
        /**
         * The minimum value of the quantity selector. If specified, the value of the quantity selector cannot go below this value.
         * A templated string may be used instead of a number to extract a value from the data context.
         */
        min?: number | string;
        /**
         * The maximum value of the quantity selector. If specified, the value of the quantity selector cannot go above this value.
         * A templated string may be used instead of a number to extract a value from the data context.
         */
        max?: number | string;
    }

    /**
     * Options for the label
     */
    interface UnderLabelOptions {
        /**
         * The color for the label. These functions takes in a theme and lets you choose either a colour from the theme or just a hex code string
         */
        color: {
            /**
             * The colour to show when all quantity has been selected. Accepts a hex color code or a mystique color.
             */
            all: keyof MystiqueThemeColours | string;
            /**
             * The colour to show when only some but not all or none of the quantity has been selected. Accepts a hex color code or a mystique color.
             */
            some: keyof MystiqueThemeColours | string;
            /**
             * The colour to show when none of the quantity has been selected. Accepts a hex color code or a mystique color.
             */
            none: keyof MystiqueThemeColours | string;
        };
    }

    /**
     * The event that is sent by the onChange method
     */
    export interface QuantitySelectorEvent {
        /**
         * The value of the quantity selector. This will always be a number when passed back from onChange.
         * However, we allow value to be a string so an i18n string can be used to extract an initial value from the data.
         */
        value: number | string;
        /**
         * The id of the quantity selector. This is intended to be used to identify which quantity selector this event came from. 
         */
        id: string;
    }

    /**
     * The properties of the quantity list. It contains all properties a list usually has, plus it accepts
     * properties for the quantity selector as well. The attribute label also has a fallback value if the original
     * label is an i18n key and it does not resolve to a string. (IE a translation was not found for that key.)
     */
    export interface QuantityListProps extends ListProps {
        /**
         * The quantity selector props
         */
        quantitySelectorProps: QuantitySelectorProps;
        /**
         * Attributes where labels are translatable
         */
        attributes: TranslatableAttribute[];
    }

    export interface TranslatableAttribute extends ListColumn {
        /**
         * The label to show. This is translated by the Quantity Selector component
         */
        label: string;
        /**
         * A label to fallback on if the above label doesn't resolve to a proper string.
         */
        labelFallback?: string;
    }

    /**
     * A version of the List component that automatically appends a quantity selector to the end of the list.
     */
    export const QuantityList: FC<QuantityListProps>;
}

declare module 'mystique/components/QuantitySelectorComponent' {
    import {FC} from 'react';
    import {FormFieldProps} from 'mystique/registry/FieldRegistry';

    export type PaletteColorKey = 'primary' | 'secondary' | 'error' | 'success' | 'info' | 'warning';

    /**
     * Options for the text shown inside the quantity selector
     */
    export interface InnerTextOptions {
        /**
         * The color for the text. These functions take in a theme and lets you choose either a colour from the theme or just a hex code string
         */
        color: {
            /**
             * The colour to show when all quantity has been selected.
             */
            all: PaletteColorKey | string;
            /**
             * The colour to show when only some but not all or none of the quantity has been selected.
             */
            some: PaletteColorKey | string;
            /**
             * The colour to show when none of the quantity has been selected.
             */
            none: PaletteColorKey | string;
        };
    }

    export interface InnerText {
        /**
         * The value of the text. This can be an i18n key. If not found, it defaults to 'of {{max}}'
         */
        string: string;
        /**
         * Optional styling options for the text inside the quantity selector.
         */
        options?: InnerTextOptions;
    }

    /**
     * This describes the event that will be sent in the onChange method
     */
    interface QuantitySelectorEvent {
        /**
         * The value of the quantity selector. This will always be a number when passed back from onChange, but we allow string values here so the configurer can use
         * an i18n string to extract the initial value from the data
         */
        value: number | string;
        /**
         * The ID of the event. This can be used to identify which quantity selector the event came from.
         */
        id: string;
    }

    /**
     * Options for validating the quantity selector input. This differs from the quantity selector in that min and max can be strings to support templated strings.
     * If min or max are strings, then they will be rendered against the data before being passed into the quantity selector.
     */
    export interface QuantitySelectorComponentValidation {
        min?: number | string;
        max?: number | string;
        id?: string;
    }

    export interface QuantitySelectorComponentProps extends FormFieldProps<QuantitySelectorEvent> {
        /**
         * The data provided by parent data providers
         */
        data: any;
        /**
         * An optional data source that lets the router select a specific part of the data to use. This has the same functionality as the MystiqueComponentInstance
         * dataSource.
         */
        dataSource?: string;
        /**
         * An optional feature where you define whether the data passed into the quantity selector is valid or not. <br/>
         * With this feature, you can instead display a string instead of the component when the data is not valid for a quantity selector. <br/>
         *
         * This is separate from the validation prop which is used for validating user input only.
         */
        itemValidation?: {
            /**
             * The condition to check whether or not the item is valid or not. This should be a templated string that resolves to a boolean.
             * For example, if you want to check that the amount of quantity is greater than zero before showing the quantity selector you can
             * use {{gt orderItem.quantity 0}}.
             */
            condition: string;
            /**
             * If the data for this quantity selector is invalid according to isValid, this message will be displayed instead of the
             * quantity selector component. This can be an i18n string. If the key is not found, or this is not provided, then the component defaults
             * to using the error 'Invalid Item'
             */
            messageOnInvalid?: string;
        };
        /**
         * An optional bit of text that's shown inside the quantity selector.
         */
        innerText?: InnerText;
        /**
         * Validation settings for the quantity selector
         */
        validation?: QuantitySelectorComponentValidation;
        /**
         * @deprecated for backward compatibility. 'innerText' should be used instead.
         */
        underLabel?: InnerText;
    }

    export const QuantitySelectorComponent: FC<QuantitySelectorComponentProps>;
}