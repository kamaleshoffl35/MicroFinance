import * as React from 'react';
export interface ModalDialogProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * @default 'modal'
     */
    bsPrefix?: string | undefined;
    /**
     * Render a large, extra large or small modal.
     */
    size?: 'sm' | 'lg' | 'xl' | undefined;
    /**
     * Renders a fullscreen modal. Specifying a breakpoint will render the modal
     * as fullscreen __below__ the breakpoint size.
     */
    fullscreen?: true | string | 'sm-down' | 'md-down' | 'lg-down' | 'xl-down' | 'xxl-down' | undefined;
    /**
     * Specify whether the Component should be vertically centered
     */
    centered?: boolean | undefined;
    /**
     * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
     */
    scrollable?: boolean | undefined;
    /**
     * Additional class names for the modal content element.
     */
    contentClassName?: string;
}
declare const ModalDialog: React.ForwardRefExoticComponent<ModalDialogProps & React.RefAttributes<HTMLDivElement>>;
export default ModalDialog;
