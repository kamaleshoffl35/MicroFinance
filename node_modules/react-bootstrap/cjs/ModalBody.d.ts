import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface ModalBodyProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'modal-body'
     */
    bsPrefix?: string | undefined;
}
declare const ModalBody: DynamicRefForwardingComponent<'div', ModalBodyProps>;
export default ModalBody;
