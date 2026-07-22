import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface NavbarTextProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'navbar-text'
     */
    bsPrefix?: string | undefined;
}
declare const NavbarText: DynamicRefForwardingComponent<'span', NavbarTextProps>;
export default NavbarText;
