import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface AccordionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'accordion-button'
     */
    bsPrefix?: string | undefined;
}
declare const AccordionButton: DynamicRefForwardingComponent<'div', AccordionButtonProps>;
export default AccordionButton;
