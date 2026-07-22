import * as React from 'react';
export type AspectRatio = '1x1' | '4x3' | '16x9' | '21x9' | string;
export interface RatioProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * @default 'ratio'
     */
    bsPrefix?: string | undefined;
    /**
     * This component requires a single child element
     */
    children: React.ReactElement | string | number;
    /**
     * Set the aspect ratio of the embed. A fraction or a percentage can also
     * be used to create custom aspect ratios.
     */
    aspectRatio?: AspectRatio | number | undefined;
}
declare const Ratio: React.ForwardRefExoticComponent<RatioProps & React.RefAttributes<HTMLDivElement>>;
export default Ratio;
