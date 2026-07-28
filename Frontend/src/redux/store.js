import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import loanReducer from "./loanSlice";
export const store = configureStore({
  reducer: {
    customer: customerReducer,
    loan:loanReducer,
  },
});
