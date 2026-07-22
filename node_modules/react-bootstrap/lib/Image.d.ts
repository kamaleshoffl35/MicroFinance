import * as React from 'react';
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * @default 'img'
     */
    bsPrefix?: string | undefined;
    /**
     * Sets image as fluid image.
     */
    fluid?: boolean | undefined;
    /**
     * Sets image shape as rounded.
     */
    rounded?: boolean | undefined;
    /**
     * Sets image shape as circle.
     */
    roundedCircle?: boolean | undefined;
    /**
     * Sets image shape as thumbnail.
     */
    thumbnail?: boolean | undefined;
}
declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;
export default Image;
