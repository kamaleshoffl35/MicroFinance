import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-img'
     */
    bsPrefix?: string | undefined;
    /**
     * Defines image position inside the card.
     */
    variant?: 'top' | 'bottom' | string;
}
declare const CardImg: DynamicRefForwardingComponent<'img', CardImgProps>;
export default CardImg;
