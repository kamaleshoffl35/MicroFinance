import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface OffcanvasTitleProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'offcanvas-title'
     */
    bsPrefix?: string | undefined;
}
declare const OffcanvasTitle: DynamicRefForwardingComponent<'div', OffcanvasTitleProps>;
export default OffcanvasTitle;
