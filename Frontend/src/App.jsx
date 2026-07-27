import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";
import KYCDetails from "./components/customer/KYCDetails";
import LoanManagement from "./pages/LoanManagement";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Dashboard />} />

          <Route
            path="customer"
            element={<CustomerManagement />}
          />
          <Route
  path="/kyc-verification/:id"
  element={<KYCDetails />}
/>
<Route
            path="loan"
            element={<LoanManagement />}
          />


        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;