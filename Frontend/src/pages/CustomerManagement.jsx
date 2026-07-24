import { useState } from "react";

import CustomerHeader from "../components/customer/CustomerHeader";
import CustomerFilters from "../components/customer/CustomerFilters";
import CustomerTable from "../components/customer/CustomerTable";
import CustomerRegistration from "../components/customer/CustomerRegistration";
import AppSnackbar from "../components/common/AppSnackbar";
import { Modal } from "react-bootstrap";
function CustomerManagement() {
  const [activeTab, setActiveTab] = useState("list");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  return (
    <>
      <h1>Customer Management</h1>
      <p className="text-gray">
        Registration, KYC, Guarantors and Document records.
      </p>
      <CustomerHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "list" && (
        <>
        <CustomerFilters
  setActiveTab={setActiveTab}
  search={search}
  setSearch={setSearch}
/>

          <CustomerTable
          search={search}
            setShowModal={setShowModal}
            setSelectedCustomer={setSelectedCustomer}
          />
        </>
      )}

      {activeTab === "registration" && (
        <CustomerRegistration setSnackbar={setSnackbar} />
      )}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="xl"
        dialogClassName="customer-edit-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CustomerRegistration
            editData={selectedCustomer}
            onClose={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </>
  );
}

export default CustomerManagement;
