import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export type ToastPosition = 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end';
export interface ToastContainerProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'toast-container'
     */
    bsPrefix?: string | undefined;
    /**
     * Where the toasts will be placed within the container.
     */
    position?: ToastPosition | undefined;
    /**
     * Specify the positioning method for the container.
     */
    containerPosition?: string | undefined;
}
declare const ToastContainer: DynamicRefForwardingComponent<'div', ToastContainerProps>;
export default ToastContainer;
