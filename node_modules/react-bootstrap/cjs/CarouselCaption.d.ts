import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CarouselCaptionProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'carousel-caption'
     */
    bsPrefix?: string | undefined;
}
declare const CarouselCaption: DynamicRefForwardingComponent<'div', CarouselCaptionProps>;
export default CarouselCaption;
