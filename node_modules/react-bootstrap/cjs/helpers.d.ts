import { TransitionComponent } from '@restart/ui/types';
export type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;
export type TransitionType = boolean | TransitionComponent;
export declare function getOverlayDirection(placement: string, isRTL?: boolean): string;
