import * as React from 'react';
import clsx from 'clsx';
import { jsx as _jsx } from "react/jsx-runtime";
export default className =>
/*#__PURE__*/
// eslint-disable-next-line react/display-name
React.forwardRef((p, ref) => /*#__PURE__*/_jsx("div", {
  ...p,
  ref: ref,
  className: clsx(p.className, className)
}));