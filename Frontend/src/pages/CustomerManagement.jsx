import { useState } from "react";

import CustomerHeader from "../components/customer/CustomerHeader";
import CustomerFilters from "../components/customer/CustomerFilters";
import CustomerTable from "../components/customer/CustomerTable";
import CustomerRegistration from "../components/customer/CustomerRegistration";

function CustomerManagement() {

  const [activeTab, setActiveTab] = useState("list");

  return (
    <>
     <h1>Customer Management</h1>
     <p className="text-gray">Registration, KYC, Guarantors and Document records.</p>
      <CustomerHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "list" && (
        <>
          <CustomerFilters
            setActiveTab={setActiveTab}
          />

          <CustomerTable />
        </>
      )}

      {activeTab === "registration" && (
        <CustomerRegistration />
      )}

    </>
  );
}

export default CustomerManagement;