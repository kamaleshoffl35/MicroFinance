import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardTitleProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-title'
     */
    bsPrefix?: string | undefined;
}
declare const CardTitle: DynamicRefForwardingComponent<'div', CardTitleProps>;
export default CardTitle;
