import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface NavbarBrandProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'navbar-brand'
     */
    bsPrefix?: string | undefined;
    /**
     * An href, when provided the Brand will render as an `<a>` element (unless `as` is provided).
     */
    href?: string | undefined;
}
declare const NavbarBrand: DynamicRefForwardingComponent<'a', NavbarBrandProps>;
export default NavbarBrand;
