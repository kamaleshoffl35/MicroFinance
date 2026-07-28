import { useState } from "react";

import LoanHeader from "../components/loan/LoanHeader";
import LoanFilters from "../components/loan/LoanFilters";
import LoanTable from "../components/loan/LoanTable";
import LoanApplication from "../components/loan/LoanApplication";
function LoanManagement() {

  const [activeTab, setActiveTab] = useState("list");
  const [search, setSearch] = useState("");

  return (
    <div className="customer-management-wrapper">

      <h1>Loan Management</h1>

      <p className="text-secondary">
        Applications, approval workflow and loan books by type.
      </p>

      <LoanHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "list" && (
        <>
          <LoanFilters
            search={search}
            setSearch={setSearch}
            setActiveTab={setActiveTab}
          />

          <LoanTable
            search={search}
          />
        </>
      )}
      {activeTab === "application" && (
    <LoanApplication />
)}

    </div>
  );
}

export default LoanManagement;