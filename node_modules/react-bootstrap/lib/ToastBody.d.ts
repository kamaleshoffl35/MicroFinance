import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface ToastBodyProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'toast-body'
     */
    bsPrefix?: string | undefined;
}
declare const ToastBody: DynamicRefForwardingComponent<'div', ToastBodyProps>;
export default ToastBody;
