import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface NavItemProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'nav-item'
     */
    bsPrefix?: string | undefined;
}
declare const NavItem: DynamicRefForwardingComponent<'div', NavItemProps>;
export default NavItem;
