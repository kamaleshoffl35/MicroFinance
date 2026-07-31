import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import loanReducer from "./loanSlice";
import loanTypeReducer from "./loanTypeSlice";
import tenureReducer from "./tenureSlice";
import repaymentTypeReducer from "./repaymentTypeSlice";
export const store = configureStore({
  reducer: {
    customer: customerReducer,
    loan:loanReducer,
    loanType:loanTypeReducer,
    tenure:tenureReducer,
    repaymentType: repaymentTypeReducer,
  },
});
