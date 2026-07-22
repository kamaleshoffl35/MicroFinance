import * as React from 'react';
export type CloseButtonVariant = 'white' | string;
export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * An accessible label indicating the relevant information about the Close Button.
     */
    'aria-label'?: string | undefined;
    /**
     * Render different color variant for the button.
     *
     * Omitting this will render the default dark color.
     */
    variant?: CloseButtonVariant | undefined;
}
declare const CloseButton: React.ForwardRefExoticComponent<CloseButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default CloseButton;
