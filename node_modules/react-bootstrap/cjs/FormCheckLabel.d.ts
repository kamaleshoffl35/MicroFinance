import * as React from 'react';
export interface FormCheckLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    /**
     * @default 'form-check-label'
     */
    bsPrefix?: string | undefined;
    /**
     * The HTML for attribute for associating the label with an input
     */
    htmlFor?: string | undefined;
}
declare const FormCheckLabel: React.ForwardRefExoticComponent<FormCheckLabelProps & React.RefAttributes<HTMLLabelElement>>;
export default FormCheckLabel;
