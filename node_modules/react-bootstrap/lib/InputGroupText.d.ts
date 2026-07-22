import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface InputGroupTextProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'input-group-text'
     */
    bsPrefix?: string | undefined;
}
declare const InputGroupText: DynamicRefForwardingComponent<'span', InputGroupTextProps>;
export default InputGroupText;
