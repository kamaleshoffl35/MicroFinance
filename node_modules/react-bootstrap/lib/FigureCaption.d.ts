import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface FigureCaptionProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'figure-caption'
     */
    bsPrefix?: string | undefined;
}
declare const FigureCaption: DynamicRefForwardingComponent<'figcaption', FigureCaptionProps>;
export default FigureCaption;
