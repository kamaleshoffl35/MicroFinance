import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
export type FeedbackType = 'valid' | 'invalid';
export interface FeedbackProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Element used to render the component.
     */
    as?: React.ElementType | undefined;
    /**
     * Specify whether the feedback is for valid or invalid fields
     */
    type?: FeedbackType | undefined;
    /**
     * Display feedback as a tooltip.
     */
    tooltip?: boolean | undefined;
}
declare const Feedback: DynamicRefForwardingComponent<'div', FeedbackProps>;
export default Feedback;
