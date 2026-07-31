import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";
import KYCDetails from "./components/customer/KYCDetails";
import LoanManagement from "./pages/LoanManagement";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import { useAuth } from "./context/AuthContext";


function ProtectedRoute({ children }) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function PublicRoute({ children }) {

  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}


function App() {

  return (
    <BrowserRouter>

      <Routes>


        {/* Login Page */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />


        {/* Signup Page */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

 <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

         <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Protected Application */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route index element={<Dashboard />} />


          <Route
            path="customer"
            element={<CustomerManagement />}
          />


          <Route
            path="kyc-verification/:id"
            element={<KYCDetails />}
          />


          <Route
            path="loan"
            element={<LoanManagement />}
          />


        </Route>



        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />


      </Routes>


    </BrowserRouter>
  );
}


export default App;