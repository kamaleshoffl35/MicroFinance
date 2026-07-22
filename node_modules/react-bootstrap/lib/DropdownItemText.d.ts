import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface DropdownItemTextProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'dropdown-item-text'
     */
    bsPrefix?: string | undefined;
}
declare const DropdownItemText: DynamicRefForwardingComponent<'span', DropdownItemTextProps>;
export default DropdownItemText;
