import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'btn-group'
     */
    bsPrefix?: string | undefined;
    /**
     * Sets the size for all Buttons in the group.
     */
    size?: 'sm' | 'lg' | undefined;
    /**
     * Make the set of Buttons appear vertically stacked.
     */
    vertical?: boolean | undefined;
    /**
     * An ARIA role describing the button group. Usually the default
     * "group" role is fine. An `aria-label` or `aria-labelledby`
     * prop is also recommended.
     */
    role?: string | undefined;
}
declare const ButtonGroup: DynamicRefForwardingComponent<'div', ButtonGroupProps>;
export default ButtonGroup;
