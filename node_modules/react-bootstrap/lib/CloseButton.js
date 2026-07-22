import * as React from 'react';
import clsx from 'clsx';
import { jsx as _jsx } from "react/jsx-runtime";
const CloseButton = /*#__PURE__*/React.forwardRef(({
  className,
  variant,
  'aria-label': ariaLabel = 'Close',
  ...props
}, ref) => /*#__PURE__*/_jsx("button", {
  ref: ref,
  type: "button",
  className: clsx('btn-close', variant && `btn-close-${variant}`, className),
  "aria-label": ariaLabel,
  ...props
}));
CloseButton.displayName = 'CloseButton';
export default CloseButton;