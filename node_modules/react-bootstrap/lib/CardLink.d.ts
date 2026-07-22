import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardLinkProps extends React.AnchorHTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-link'
     */
    bsPrefix?: string | undefined;
}
declare const CardLink: DynamicRefForwardingComponent<'a', CardLinkProps>;
export default CardLink;
