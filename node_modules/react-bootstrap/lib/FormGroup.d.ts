import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface FormGroupProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
     */
    controlId?: string | undefined;
}
declare const FormGroup: DynamicRefForwardingComponent<'div', FormGroupProps>;
export default FormGroup;
