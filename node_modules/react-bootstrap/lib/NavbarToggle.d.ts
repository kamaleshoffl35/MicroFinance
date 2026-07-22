import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface NavbarToggleProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'navbar-toggler'
     */
    bsPrefix?: string | undefined;
    /**
     * An accessible ARIA label for the toggler button.
     */
    label?: string | undefined;
    /**
     * The toggle content. When empty, the default toggle will be rendered.
     */
    children?: React.ReactNode | undefined;
}
declare const NavbarToggle: DynamicRefForwardingComponent<'button', NavbarToggleProps>;
export default NavbarToggle;
