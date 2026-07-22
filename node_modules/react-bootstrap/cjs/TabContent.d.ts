import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface TabContentProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'tab-content'
     */
    bsPrefix?: string | undefined;
}
declare const TabContent: DynamicRefForwardingComponent<'div', TabContentProps>;
export default TabContent;
