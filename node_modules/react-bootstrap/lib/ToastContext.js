"use client";

import * as React from 'react';
const ToastContext = /*#__PURE__*/React.createContext({
  onClose() {}
});
ToastContext.displayName = 'ToastContext';
export default ToastContext;