import * as React from 'react';
export declare const DEFAULT_BREAKPOINTS: string[];
export declare const DEFAULT_MIN_BREAKPOINT = "xs";
export interface ThemeContextValue {
    /**
     * An object mapping of Bootstrap component classes that
     * map to a custom class.
     *
     * **Note: Changing prefixes is an escape hatch and generally
     * shouldn't be used.**
     *
     * For more information, see [here](/getting-started/theming/#prefixing-components).
     */
    prefixes: Record<string, string>;
    /**
     * An array of breakpoints that your application supports.
     * Defaults to the standard Bootstrap breakpoints.
     */
    breakpoints: string[];
    /**
     * The minimum breakpoint used by your application.
     * Defaults to the smallest of the standard Bootstrap breakpoints.
     */
    minBreakpoint?: string | undefined;
    /**
     * Indicates the directionality of the application's text.
     *
     * Use `rtl` to set text as "right to left".
     */
    dir?: string | undefined;
}
export interface ThemeProviderProps extends Partial<ThemeContextValue> {
    children: React.ReactNode;
}
declare const Consumer: React.Consumer<ThemeContextValue>;
declare function ThemeProvider({ prefixes, breakpoints, minBreakpoint, dir, children, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useBootstrapPrefix(prefix: string | undefined, defaultPrefix: string): string;
export declare function useBootstrapBreakpoints(): string[];
export declare function useBootstrapMinBreakpoint(): string | undefined;
export declare function useIsRTL(): boolean;
declare function createBootstrapComponent(Component: any, opts: any): React.ForwardRefExoticComponent<{
    bsPrefix?: string;
} & React.RefAttributes<any>>;
export { createBootstrapComponent, Consumer as ThemeConsumer };
export default ThemeProvider;
