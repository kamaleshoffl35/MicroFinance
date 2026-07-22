import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface DropdownHeaderProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'dropdown-header'
     */
    bsPrefix?: string | undefined;
    /**
     * An ARIA accessible role.
     */
    role?: string | undefined;
}
declare const DropdownHeader: DynamicRefForwardingComponent<'div', DropdownHeaderProps>;
export default DropdownHeader;
