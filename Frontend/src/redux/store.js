import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import loanReducer from "./loanSlice";
import loanTypeReducer from "./loanTypeSlice";
import tenureReducer from "./tenureSlice";
export const store = configureStore({
  reducer: {
    customer: customerReducer,
    loan:loanReducer,
    loanType:loanTypeReducer,
    tenure:tenureReducer,
  },
});
