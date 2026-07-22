import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface AlertHeadingProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'alert-heading'
     */
    bsPrefix?: string | undefined;
}
declare const AlertHeading: DynamicRefForwardingComponent<'div', AlertHeadingProps>;
export default AlertHeading;
