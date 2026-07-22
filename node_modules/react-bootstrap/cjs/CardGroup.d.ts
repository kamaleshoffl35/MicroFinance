import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardGroupProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-group'
     */
    bsPrefix?: string | undefined;
}
declare const CardGroup: DynamicRefForwardingComponent<'div', CardGroupProps>;
export default CardGroup;
