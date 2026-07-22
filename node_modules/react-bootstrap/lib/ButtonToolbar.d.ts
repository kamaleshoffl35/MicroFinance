import * as React from 'react';
export interface ButtonToolbarProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * @default 'btn-toolbar'
     */
    bsPrefix?: string | undefined;
    /**
     * The ARIA role describing the button toolbar. Generally the default
     * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
     * prop is also recommended.
     */
    role?: string | undefined;
}
declare const ButtonToolbar: React.ForwardRefExoticComponent<ButtonToolbarProps & React.RefAttributes<HTMLDivElement>>;
export default ButtonToolbar;
