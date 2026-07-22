import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface ModalFooterProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'modal-footer'
     */
    bsPrefix?: string | undefined;
}
declare const ModalFooter: DynamicRefForwardingComponent<'div', ModalFooterProps>;
export default ModalFooter;
