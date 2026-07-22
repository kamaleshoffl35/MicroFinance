import clsx from 'clsx';
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const Feedback = /*#__PURE__*/React.forwardRef(
// Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
({
  as: Component = 'div',
  className,
  type = 'valid',
  tooltip = false,
  ...props
}, ref) => /*#__PURE__*/_jsx(Component, {
  ...props,
  ref: ref,
  className: clsx(className, `${type}-${tooltip ? 'tooltip' : 'feedback'}`)
}));
Feedback.displayName = 'Feedback';
export default Feedback;