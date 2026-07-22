import * as React from 'react';
import type { DynamicRefForwardingComponent, EventKey } from '@restart/ui/types';
export interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'dropdown-item'
     */
    bsPrefix?: string | undefined;
    /**
     * Highlight the menu item as active.
     */
    active?: boolean | undefined;
    /**
     * Disable the menu item, making it unselectable.
     */
    disabled?: boolean | undefined;
    /**
     * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
     */
    eventKey?: EventKey | undefined;
    /**
     * HTML `href` attribute corresponding to `a.href`.
     */
    href?: string | undefined;
}
declare const DropdownItem: DynamicRefForwardingComponent<'a', DropdownItemProps>;
export default DropdownItem;
