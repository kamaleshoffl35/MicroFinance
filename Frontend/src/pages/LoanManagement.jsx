import { useState } from "react";

import LoanHeader from "../components/loan/LoanHeader";
import LoanFilters from "../components/loan/LoanFilters";
import LoanTable from "../components/loan/LoanTable";
import LoanApplication from "../components/loan/LoanApplication";
import LoanTypes from "../components/loan/LoanTypes";
import { Modal } from "react-bootstrap";
import Tenure from "../components/loan/Tenure";
function LoanManagement() {
  const [activeTab, setActiveTab] = useState("list");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  return (
    <div className="customer-management-wrapper">
      <h1>Loan Management</h1>

      <p className="text-secondary">
        Applications, approval workflow and loan books by type.
      </p>

      <LoanHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "list" && (
        <>
          <LoanFilters
            search={search}
            setSearch={setSearch}
            setActiveTab={setActiveTab}
            setShowModal={setShowModal}
            setSelectedLoan={setSelectedLoan}
          />

          <LoanTable
            search={search}
            setShowModal={setShowModal}
            setSelectedLoan={setSelectedLoan}
          />
        </>
      )}

      {activeTab === "new" && (
        <LoanApplication
          selectedLoan={selectedLoan}
          setSelectedLoan={setSelectedLoan}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {activeTab === "types" && <LoanTypes />}
      {activeTab === "tenure" && <Tenure />}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedLoan(null);
        }}
        size="xl"
        dialogClassName="customer-edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedLoan ? "Edit Loan" : "New Loan Application"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoanApplication
            selectedLoan={selectedLoan}
            setSelectedLoan={setSelectedLoan}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LoanManagement;
