import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface CardBodyProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'card-body'
     */
    bsPrefix?: string | undefined;
}
declare const CardBody: DynamicRefForwardingComponent<'div', CardBodyProps>;
export default CardBody;
