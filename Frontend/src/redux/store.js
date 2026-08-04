import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./customerSlice";
import loanReducer from "./loanSlice";
import loanTypeReducer from "./loanTypeSlice";
import tenureReducer from "./tenureSlice";
import repaymentTypeReducer from "./repaymentTypeSlice";
import permissionReducer from "./permissionSlice";
import userReducer from "./usersSlice"
import rolesReducer from "./rolesSlice";
import fieldVerificationReducer from "./fieldVerificationSlice";
export const store = configureStore({
  reducer: {
    customer: customerReducer,
    loan:loanReducer,
    loanType:loanTypeReducer,
    tenure:tenureReducer,
    repaymentType: repaymentTypeReducer,
    permissions:permissionReducer,
    users:userReducer,
    roles: rolesReducer,
    fieldVerification: fieldVerificationReducer,
  },
});
