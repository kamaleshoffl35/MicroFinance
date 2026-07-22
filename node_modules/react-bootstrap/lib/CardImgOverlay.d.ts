import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardImgOverlayProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-img-overlay'
     */
    bsPrefix?: string | undefined;
}
declare const CardImgOverlay: DynamicRefForwardingComponent<'div', CardImgOverlayProps>;
export default CardImgOverlay;
