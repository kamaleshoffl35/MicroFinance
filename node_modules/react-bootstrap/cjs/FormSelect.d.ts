import * as React from 'react';
export interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /**
     * @default 'form-select'
     */
    bsPrefix?: string | undefined;
    /**
     * The size attribute of the underlying HTML element.
     * Specifies the number of visible options.
     */
    htmlSize?: number | undefined;
    /**
     * Size variants
     *
     * @type {('sm'|'lg')}
     */
    size?: 'sm' | 'lg' | undefined;
    /**
     * Make the control disabled
     */
    disabled?: boolean | undefined;
    /**
     * The `value` attribute of underlying input
     *
     * @controllable onChange
     * */
    value?: string | string[] | number | undefined;
    /**
     * A callback fired when the `value` prop changes
     */
    onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
    /**
     * Add "valid" validation styles to the control
     */
    isValid?: boolean | undefined;
    /**
     * Add "invalid" validation styles to the control and accompanying label
     */
    isInvalid?: boolean | undefined;
}
declare const FormSelect: React.ForwardRefExoticComponent<FormSelectProps & React.RefAttributes<HTMLSelectElement>>;
export default FormSelect;
