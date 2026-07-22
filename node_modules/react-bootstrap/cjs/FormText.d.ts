import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface FormTextProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'form-text'
     */
    bsPrefix?: string | undefined;
    /**
     * A convenience prop for add the `text-muted` class,
     * since it's so commonly used here.
     */
    muted?: boolean | undefined;
}
declare const FormText: DynamicRefForwardingComponent<'small', FormTextProps>;
export default FormText;
