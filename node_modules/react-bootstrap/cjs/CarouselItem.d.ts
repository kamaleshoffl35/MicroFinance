import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CarouselItemProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'carousel-item'
     */
    bsPrefix?: string | undefined;
    /** The amount of time to delay between automatically cycling this specific item.
     * Will default to the Carousel's `interval` prop value if none is specified.
     */
    interval?: number | undefined;
}
declare const CarouselItem: DynamicRefForwardingComponent<'div', CarouselItemProps>;
export default CarouselItem;
