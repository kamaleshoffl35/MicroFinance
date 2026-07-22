import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface AccordionItemProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'accordion-item'
     */
    bsPrefix?: string | undefined;
    /**
     * A unique key used to control this item's collapse/expand.
     */
    eventKey: string;
}
declare const AccordionItem: DynamicRefForwardingComponent<'div', AccordionItemProps>;
export default AccordionItem;
