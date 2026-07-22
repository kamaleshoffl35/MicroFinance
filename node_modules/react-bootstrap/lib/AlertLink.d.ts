import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface AlertLinkProps extends React.AnchorHTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'alert-link'
     */
    bsPrefix?: string | undefined;
}
declare const AlertLink: DynamicRefForwardingComponent<'a', AlertLinkProps>;
export default AlertLink;
