import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface PopoverBodyProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'popover-body'
     */
    bsPrefix?: string | undefined;
}
declare const PopoverBody: DynamicRefForwardingComponent<'div', PopoverBodyProps>;
export default PopoverBody;
