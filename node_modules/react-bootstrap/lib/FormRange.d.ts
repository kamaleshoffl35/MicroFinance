import * as React from 'react';
export interface FormRangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'form-range'
     */
    bsPrefix?: string | undefined;
    /**
     * Uses `controlId` from `<FormGroup>` if not explicitly specified.
     */
    id?: string | undefined;
}
declare const FormRange: React.ForwardRefExoticComponent<FormRangeProps & React.RefAttributes<HTMLInputElement>>;
export default FormRange;
