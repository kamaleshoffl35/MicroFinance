import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardHeaderProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-header'
     */
    bsPrefix?: string | undefined;
}
declare const CardHeader: DynamicRefForwardingComponent<'div', CardHeaderProps>;
export default CardHeader;
