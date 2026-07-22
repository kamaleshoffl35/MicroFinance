import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
export interface PageItemProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * Disables the PageItem
     */
    disabled?: boolean | undefined;
    /**
     * Styles PageItem as active, and renders a `<span>` instead of an `<a>`.
     */
    active?: boolean | undefined;
    /**
     * An accessible label indicating the active state.
     */
    activeLabel?: string | undefined;
    /**
     * The HTML href attribute for the `PageItem`.
     */
    href?: string | undefined;
    /**
     * Custom style for the inner component of the PageItem
     */
    linkStyle?: React.CSSProperties | undefined;
    /**
     * Custom className for the inner component of the PageItem
     */
    linkClassName?: string | undefined;
}
declare const PageItem: DynamicRefForwardingComponent<'li', PageItemProps>;
export default PageItem;
export declare const First: React.ForwardRefExoticComponent<PageItemProps & React.RefAttributes<unknown>>;
export declare const Prev: React.ForwardRefExoticComponent<PageItemProps & React.RefAttributes<unknown>>;
export declare const Ellipsis: React.ForwardRefExoticComponent<PageItemProps & React.RefAttributes<unknown>>;
export declare const Next: React.ForwardRefExoticComponent<PageItemProps & React.RefAttributes<unknown>>;
export declare const Last: React.ForwardRefExoticComponent<PageItemProps & React.RefAttributes<unknown>>;
