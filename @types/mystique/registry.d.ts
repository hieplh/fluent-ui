declare module 'mystique/registry/ComponentRegistry' {
    import {FC} from 'react';

    /**
     * Standard interface components may extend to receive injected data from the page query.
     */
    export interface StdProps {
        /**
         * Page-query data, structure will depend on the query defined in the manifest.
         *
         * @remarks
         * This data may be scoped via the `dataSource` parameter of the component and its parents in the manifest.
         */
        data?: any;
    }

    /**
     * Additional information about a component, to be used to improve Mystique management
     * UX in the future.
     */
    export interface ComponentConfig<T> {
        /**
         * Logical type of this component.
         * Page for full replacements of the Mystique page component.
         * Layout for "structural" components, like Grids or Conditionals.
         * Content for components that display information.
         */
        category: 'page' | 'layout' | 'content' | 'filter';
    }

    interface IComponentRegistry {
        /**
         * Register a new component with Mystique.
         *
         * @remarks
         * A Component registered with the Component Registry become available to use
         * in a Mystique manifest, by any of its aliases.
         *
         * @param aliases list of names by which the manifest can reference this Component.
         * @param component the implementation of a React component.
         * @param config additional meta data of the component.
         */
        register: <T> (aliases: string[], component: FC<StdProps & T>, config: ComponentConfig<T>) => void;
        /**
         * Retrieve a registered component.
         *
         * @param name the alias of the component to return. If an array of aliases are provided
         * then the first matching component will be provided (to support fallback logic).
         * @param options disable logging to avoid unnecessary console logs when misses are expected.
         */
        get: <T extends StdProps> (name: string | string[], options?: { noLog: boolean; }) => FC<T>;
    }

    /**
     * Component Registry for the Mystique SDK.
     */
    export const ComponentRegistry: IComponentRegistry;
}

declare module 'mystique/registry/FieldRegistry' {
    import {FC} from 'react';

    /**
     * Form field option, for selection-based fields.
     */
    export interface FormFieldOption<T> {
        /**
         * Human-readable label for the option.
         */
        label?: string;
        /**
         * Value of the option, in the same type as the field itself.
         */
        value: T;
    }

    /**
     * Form field definition as understood by the Mystique Form component.
     *
     * @remarks
     * Rubix User Actions and GraphQL fields are mapped into this type.
     */
    export interface FormField<T> {
        /**
         * The name of the field.
         */
        name: string;
        /**
         * The human-readable label of the field.
         */
        label: string;
        /**
         * Current value of the field.
         */
        value?: T;
        /**
         * Original value of the field.
         */
        defaultValue?: T;
        /**
         * Value options for this field (e.g. in a 'select' or 'radio group')
         */
        options?: FormFieldOption<T>[];
        /**
         * User helper text to be presented alongside the field.
         */
        helperText?: string;
        /**
         * Validation options configured for this field.
         * See field documentation for specific supported values.
         */
        validation?: Record<string, any>;
    }

    /**
     * Helper class that can be used to override a FormField when their fields are combined.
     */
    export type FormFieldOverride = Partial<FormField<any>>;

    /**
     * The OnChangeOptions provides extensions for Field instances to interact
     * with the wrapper form (in addition to providing values).
     */
    export interface OnChangeOptions {
        /**
         * When a field produces a `confirm` object, the title and content of that
         * confirmation message will be presented to the user in a modal on submit
         * of the form.
         *
         * This can be used to summarise complex information, or to provide a warning
         * about side-effects of submitting this data (and the modal can be dismissed
         * without submitting).
         *
         * When multiple fields within a form produce confirm messages, all will be
         * displayed sequentially in a single modal.
         */
        confirm?: {
            /**
             * Title value of the confirm message.
             */
            title: string;
            /**
             * Content of the confirm message. This can be any rendered component, but
             * keep in mind that it will be displayed within a modal.
             */
            content: JSX.Element;
        };
        /**
         * When a field produces a 'summary' object, the content of the summary message 
         * will be presented to the user within a hovering div on the top left
         * corner of the form. Each field that produces a summary object will have its summary
         * placed in this hovering div one after the other.
         * 
         * This can be useful for showing a summary of details across all fields
         * while the user makes changes to the form.
         * 
         * This differs from the confirmation message in that it shows up actively in the 
         * form at all times, whereas the confirmation message only appears after hitting
         * the submit button, and the summary appears inside the form instead of in a modal. 
         */
        summary?: {
            /**
             * The content of the summary message. This can be any rendered component, but
             * keep in mind that it will be displayed inside the form on the top left corner.
             */
            content: JSX.Element;
        };
        /** 
         * Set to true to notify the form that this field is currently not in a valid state. 
         * The value is ignored in this case, and the form will not validate (or submit) even 
         * if the field is optional.
         *
         * The primary use case for isInvalid is to prevent form submission when a complex 
         * field (i.e. one with multiple input controls) is partially filled in, such that 
         * we can’t submit the current value but also don’t want to discard it.
         * 
         * This value defaults to false when not provided. (Form is valid.)
         */
        isInvalid?: boolean;
    }

    interface FormEntityReference {
        /**
         * Type of the entity.
         */
        type: string;
        /**
         * ID of the entity. Optional as some entity types will only have a `ref`.
         */
        id?: string;
        /**
         * Ref of the entity. Optional as some entity types will only have an `ID`.
         */
        ref?: string;
    }

    export interface FormEntityContext {
        /**
         * Info about the target entity of the form.
         */
        entity: FormEntityReference;
        /**
         * Info about the domain root of the target entity of the form.
         */
        rootEntity?: FormEntityReference;
    }

    /**
     * Extension of the FormField interface to include props generated by the
     * Form component itself.
     *
     * React components must implement this to be registered as a Field.
     *
     * @param T is the data type that this field produces on submit.
     */
    export interface FormFieldProps<T> extends FormField<T> {
        /**
         * Push a value change to the parent Form in response to a user interaction.
         * @param value the updated value of the field.
         * @param options to control other form features.
         */
        onChange: (value: T, options?: OnChangeOptions) => void;
        /**
         * Call when the user finishes interacting with a field. Causes the field to be validated.
         */
        onBlur?: () => void;
        /**
         * Any errors determined by the Form validation logic.
         */
        error?: string;
        /**
         * Context information of the entity being updated.
         *
         * This can be used to load information from or related to the target entity.
         */
        entityContext?: FormEntityContext[];
        lastSubmit?:number;
    }

    interface IFieldRegistry {
        /**
         * Register a field-type component to be used in Rubix User Action or GraphQL mutation forms.
         *
         * @param aliases list of field types for which the component is applicable.
         * @param field the implementation of a React component extending the FormFieldProps interface.
         */
        register: <T> (aliases: string[], field: FC<FormFieldProps<T>>) => void;
        /**
         * Retrieve a registered field.
         *
         * @param name the alias of the field to return. If an array of aliases are provided
         * then the first matching field will be provided (to support fallback logic).
         * @param options disable logging to avoid unnecessary console logs when misses are expected.
         */
        get: <T> (name: string | string[], options?: { noLog: boolean; }) => FC<FormFieldProps<T>>;
    }

    /**
     * Field registry for the Mystique SDK
     */
    export const FieldRegistry: IFieldRegistry;
}

declare module 'mystique/registry/TemplateRegistry' {
    interface ITemplateRegistry {
        /**
         * Register a new template helper with Mystique.
         *
         * @remarks
         * A Template registered with the TemplateRenderer can be used in all cases where
         * a template string is rendered. This is typically used to build user customisable
         * Components.
         *
         * @param aliases list of names by which this Component can be referenced in template strings.
         * @param fn function implementing the template logic. See https://handlebarsjs.com/ for API specifications.
         */
        register: (alias: string | string[], fn: (...args: any[]) => any) => void;
        /**
         * Render a template string, using all registered templates.
         *
         * @param template string value to render.
         * @param context values that can be referenced in the template string (typically `data`)
         */
        render: (template?: string, context?: any, options?: any) => string;
        /**
         * When writing a template helper that returns markup, wrap in a `noEscape` object.
         *
         * @remarks
         * Ensure that any user-generated data is clean before using this!
         *
         * @param value html string to prevent escaping.
         */
        noEscape: (value: any) => unknown;
    }

    /**
     * Template Registry for the Mystique SDK.
     */
    export const TemplateRegistry: ITemplateRegistry;
}
