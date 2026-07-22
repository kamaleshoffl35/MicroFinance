import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardSubtitleProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-subtitle'
     */
    bsPrefix?: string | undefined;
}
declare const CardSubtitle: DynamicRefForwardingComponent<'div', CardSubtitleProps>;
export default CardSubtitle;
