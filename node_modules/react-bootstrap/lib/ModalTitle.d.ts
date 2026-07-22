import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface ModalTitleProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'modal-title'
     */
    bsPrefix?: string | undefined;
}
declare const ModalTitle: DynamicRefForwardingComponent<'span', ModalTitleProps>;
export default ModalTitle;
