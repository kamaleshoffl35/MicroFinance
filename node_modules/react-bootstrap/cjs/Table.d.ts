import * as React from 'react';
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    /**
     * @default 'table'
     */
    bsPrefix?: string | undefined;
    /**
     * Adds zebra-striping to any table row within the `<tbody>`.
     * Use `columns` to add zebra-striping to any table column.
     */
    striped?: boolean | string | undefined;
    /**
     * Adds borders on all sides of the table and cells.
     */
    bordered?: boolean | undefined;
    /**
     * Removes all borders on the table and cells, including table header.
     */
    borderless?: boolean | undefined;
    /**
     * Enable a hover state on table rows within a `<tbody>`.
     */
    hover?: boolean | undefined;
    /**
     * Make tables more compact by cutting cell padding in half by setting
     * size as `sm`.
     */
    size?: string | undefined;
    /**
     * Invert the colors of the table — with light text on dark backgrounds
     * by setting variant as `dark`.
     */
    variant?: string | undefined;
    /**
     * Responsive tables allow tables to be scrolled horizontally with ease.
     * Across every breakpoint, use `responsive` for horizontally
     * scrolling tables. Responsive tables are wrapped automatically in a `div`.
     * Use `responsive="sm"`, `responsive="md"`, `responsive="lg"`, or
     * `responsive="xl"` as needed to create responsive tables up to
     * a particular breakpoint. From that breakpoint and up, the table will
     * behave normally and not scroll horizontally.
     */
    responsive?: boolean | string | undefined;
}
declare const Table: React.ForwardRefExoticComponent<TableProps & React.RefAttributes<HTMLTableElement>>;
export default Table;
