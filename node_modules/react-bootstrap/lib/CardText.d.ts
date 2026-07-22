import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardTextProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-text'
     */
    bsPrefix?: string | undefined;
}
declare const CardText: DynamicRefForwardingComponent<'p', CardTextProps>;
export default CardText;
