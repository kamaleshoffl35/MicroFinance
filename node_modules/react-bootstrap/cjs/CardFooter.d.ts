import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardFooterProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-footer'
     */
    bsPrefix?: string | undefined;
}
declare const CardFooter: DynamicRefForwardingComponent<'div', CardFooterProps>;
export default CardFooter;
