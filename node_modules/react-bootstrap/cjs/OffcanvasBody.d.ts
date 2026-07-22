import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface OffcanvasBodyProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'offcanvas-body'
     */
    bsPrefix?: string | undefined;
}
declare const OffcanvasBody: DynamicRefForwardingComponent<'div', OffcanvasBodyProps>;
export default OffcanvasBody;
