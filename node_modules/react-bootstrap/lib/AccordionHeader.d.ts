import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface AccordionHeaderProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'accordion-header'
     */
    bsPrefix?: string | undefined;
    /**
     * Disables the button in the header.
     */
    disabled?: boolean | undefined;
}
declare const AccordionHeader: DynamicRefForwardingComponent<'h2', AccordionHeaderProps>;
export default AccordionHeader;
