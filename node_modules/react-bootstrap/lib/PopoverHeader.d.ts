import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface PopoverHeaderProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'popover-header'
     */
    bsPrefix?: string | undefined;
}
declare const PopoverHeader: DynamicRefForwardingComponent<'div', PopoverHeaderProps>;
export default PopoverHeader;
