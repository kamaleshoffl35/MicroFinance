import * as React from 'react';
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * @default 'progress'
     */
    bsPrefix?: string | undefined;
    /**
     * Minimum value progress can begin from
     */
    min?: number | undefined;
    /**
     * Current value of progress
     */
    now?: number | undefined;
    /**
     * Maximum value progress can reach
     */
    max?: number | undefined;
    /**
     * Show label that represents visual percentage.
     * EG. 60%
     */
    label?: React.ReactNode | undefined;
    /**
     * Hide's the label visually.
     */
    visuallyHidden?: boolean | undefined;
    /**
     * Uses a gradient to create a striped effect.
     */
    striped?: boolean | undefined;
    /**
     * Animate's the stripes from right to left
     */
    animated?: boolean | undefined;
    /**
     * Sets the background class of the progress bar.
     *
     * @type {'success' | 'danger' | 'warning' | 'info' | string | undefined}
     */
    variant?: 'success' | 'danger' | 'warning' | 'info' | string | undefined;
    /**
     * @private
     */
    isChild?: boolean | undefined;
}
declare const ProgressBar: React.ForwardRefExoticComponent<ProgressBarProps & React.RefAttributes<HTMLDivElement>>;
export default ProgressBar;
