import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";

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

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;