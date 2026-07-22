import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface FormFloatingProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'form-floating'
     */
    bsPrefix?: string | undefined;
}
declare const FormFloating: DynamicRefForwardingComponent<'div', FormFloatingProps>;
export default FormFloating;
