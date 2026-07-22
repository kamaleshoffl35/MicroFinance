import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
type FormCheckInputType = 'checkbox' | 'radio';
export interface FormCheckInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'form-check-input'
     */
    bsPrefix?: string | undefined;
    /**
     * A HTML id attribute, necessary for proper form accessibility.
     */
    id?: string | undefined;
    /**
     * The type of checkable.
     */
    type?: FormCheckInputType | undefined;
    /**
     * Manually style the input as valid
     */
    isValid?: boolean | undefined;
    /**
     * Manually style the input as invalid
     */
    isInvalid?: boolean | undefined;
}
declare const FormCheckInput: DynamicRefForwardingComponent<'input', FormCheckInputProps>;
export default FormCheckInput;
