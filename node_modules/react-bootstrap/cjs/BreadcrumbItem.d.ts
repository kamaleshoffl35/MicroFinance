import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface BreadcrumbItemProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'breadcrumb-item'
     */
    bsPrefix?: string | undefined;
    /**
     * Adds a visual "active" state to a Breadcrumb
     * Item and disables the link.
     */
    active?: boolean | undefined;
    /**
     * `href` attribute for the inner `a` element
     */
    href?: string | undefined;
    /**
     * You can use a custom element type for this component's inner link.
     */
    linkAs?: React.ElementType | undefined;
    /**
     * `target` attribute for the inner `a` element
     */
    target?: string | undefined;
    /**
     * `title` attribute for the inner `a` element
     */
    title?: React.ReactNode | undefined;
    /**
     * Additional props passed as-is to the underlying link for non-active items.
     */
    linkProps?: Record<string, any> | undefined;
}
declare const BreadcrumbItem: DynamicRefForwardingComponent<'li', BreadcrumbItemProps>;
export default BreadcrumbItem;
