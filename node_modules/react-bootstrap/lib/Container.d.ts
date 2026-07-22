import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'container'
     */
    bsPrefix?: string | undefined;
    /**
     * Allow the Container to fill all of its available horizontal space.
     */
    fluid?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | undefined;
}
declare const Container: DynamicRefForwardingComponent<'div', ContainerProps>;
export default Container;
