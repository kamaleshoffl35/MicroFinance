import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface DropdownDividerProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'dropdown-divider'
     */
    bsPrefix?: string | undefined;
    /**
     * An ARIA accessible role.
     */
    role?: string | undefined;
}
declare const DropdownDivider: DynamicRefForwardingComponent<'hr', DropdownDividerProps>;
export default DropdownDivider;
