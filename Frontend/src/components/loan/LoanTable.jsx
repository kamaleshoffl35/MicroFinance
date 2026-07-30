import AgGridTable from "../common/AgGridTable";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans, deleteLoan } from "../../redux/loanSlice";
import ConfirmDialog from "../common/ConfirmDialog";
import { FILE_BASE_URL } from "../../api/axiosInstance";
import AppSnackbar from "../common/AppSnackbar";
import { Modal, Card, Row, Col, ListGroup } from "react-bootstrap";
function LoanTable({ search, setShowModal, setSelectedLoan }) {
  const dispatch = useDispatch();

  const { loans } = useSelector((state) => state.loan);
  const [showView, setShowView] = useState(false);
  const [viewLoan, setViewLoan] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [loanToDelete, setLoanToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    dispatch(fetchLoans());
  }, [dispatch]);

  const rowData = (loans ?? [])
    .filter((loan) => loan != null)
    .map((loan) => ({
      ...loan,
      loanId: loan.loanId,
      customerName: loan.customer?.customerName || "-",
      type: loan.loanType,
      principal: `₹${Number(loan.loanAmount ?? 0).toLocaleString("en-IN")}`,
    }));
  const keyword = (search || "").toLowerCase();

  const filteredRows = rowData.filter(
    (loan) =>
      (loan.loanId || "").toLowerCase().includes(keyword) ||
      (loan.customerName || "").toLowerCase().includes(keyword),
  );

  const columnDefs = [
    {
      headerName: "Loan ID",
      field: "loanId",
    },
    {
      headerName: "Customer",
      field: "customerName",
    },
    {
      headerName: "Loan Type",
      field: "type",
    },
    {
      headerName: "Principal",
      field: "principal",
    },
    {
      headerName: "Tenure",
      field: "tenure",
      valueFormatter: (params) => `${params.value} Months`,
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params) => getStatusBadge(params.value),
    },
  ];

  const handleDelete = async () => {
    if (!loanToDelete) return;

    try {
      await dispatch(deleteLoan(loanToDelete._id)).unwrap();

      setShowDelete(false);
      setLoanToDelete(null);

      setSnackbar({
        open: true,
        message: "Loan deleted successfully.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err || "Failed to delete loan.",
        severity: "error",
      });
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <Badge bg="success">Approved</Badge>;

      case "Pending":
        return <Badge bg="warning">Pending</Badge>;

      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;

      case "Disbursed":
        return <Badge bg="primary">Disbursed</Badge>;

      case "Closed":
        return <Badge bg="dark">Closed</Badge>;

      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  console.log("Loans State:", loans);
  return (
    <>
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
      <AgGridTable
        rowData={filteredRows}
        columnDefs={columnDefs}
        showActions={true}
        onView={(row) => {
          setViewLoan(row);
          setShowView(true);
        }}
        onEdit={(row) => {
          setSelectedLoan(row);

          setShowModal(true);
        }}
        onDelete={(row) => {
          setLoanToDelete(row);
          setShowDelete(true);
        }}
      />
      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        dialogClassName="customer-view-modal"
        backdrop="static"
        enforceFocus
      >
        <Modal.Header closeButton>
          <Modal.Title>Loan Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {viewLoan && (
            <Row className="g-3">
              <Col lg={3} md={6}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Loan Details
                    </h6>

                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>Loan ID</b>
                        <br />
                        {viewLoan.loanId}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Loan Type</b>
                        <br />
                        {viewLoan.loanType}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Amount</b>
                        <br />₹{" "}
                        {Number(viewLoan.loanAmount).toLocaleString("en-IN")}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Interest</b>
                        <br />
                        {viewLoan.interestRate} %
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Tenure</b>
                        <br />
                        {viewLoan.tenure} Months
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Repayment</b>
                        <br />
                        {viewLoan.repaymentType}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Status</b>
                        <br />
                        {getStatusBadge(viewLoan.status)}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={3} md={6}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Customer Details
                    </h6>

                    <p>
                      <b>Name</b>
                      <br />
                      {viewLoan.customer?.customerName}
                    </p>

                    <p>
                      <b>Customer ID</b>
                      <br />
                      {viewLoan.customer?.customerId}
                    </p>

                    <p>
                      <b>Mobile</b>
                      <br />
                      {viewLoan.customer?.mobileNumber}
                    </p>

                    <p>
                      <b>Branch</b>
                      <br />
                      {viewLoan.customer?.branch}
                    </p>

                    <p>
                      <b>Address</b>
                      <br />
                      {viewLoan.customer?.address?.doorNumber},{" "}
                      {viewLoan.customer?.address?.street},{" "}
                      {viewLoan.customer?.address?.city}
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={3} md={6}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Documents
                    </h6>
                    <div className="d-grid gap-2">
                      {viewLoan.customer?.documents?.aadhaarFront && (
                        <a
                          className="btn docs btn-sm"
                          href={`${FILE_BASE_URL}${viewLoan.customer.documents.aadhaarFront}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Aadhaar Front
                        </a>
                      )}

                      {viewLoan.customer?.documents?.aadhaarBack && (
                        <a
                          className="btn docs btn-sm"
                          href={`${FILE_BASE_URL}${viewLoan.customer.documents.aadhaarBack}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Aadhaar Back
                        </a>
                      )}

                      {viewLoan.customer?.documents?.panCard && (
                        <a
                          className="btn docs btn-sm"
                          href={`${FILE_BASE_URL}${viewLoan.customer.documents.panCard}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          PAN Card
                        </a>
                      )}

                      {viewLoan.customer?.documents?.passportPhoto && (
                        <a
                          className="btn docs btn-sm"
                          href={`${FILE_BASE_URL}${viewLoan.customer.documents.passportPhoto}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Passport Photo
                        </a>
                      )}

                      {viewLoan.customer?.documents?.signature && (
                        <a
                          className="btn docs btn-sm"
                          href={`${FILE_BASE_URL}${viewLoan.customer.documents.signature}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Signature
                        </a>
                      )}

                      {viewLoan.customer?.documents?.incomeProof && (
                        <a
                          className="btn docs btn-sm"
                          href={`${FILE_BASE_URL}${viewLoan.customer.documents.incomeProof}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Income Proof
                        </a>
                      )}
                    </div>

                    <hr />

                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Loan Purpose
                    </h6>

                    <div className="border rounded p-2 bg-light">
                      {viewLoan.loanPurpose}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3} md={6}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    {viewLoan.collateral?.goldWeight && (
                      <>
                        <h6 className="fw-bold text-secondary border-bottom pb-2">
                          Collateral
                        </h6>

                        <p>
                          <b>Gold Weight</b>
                          <br />
                          {viewLoan.collateral.goldWeight}
                        </p>

                        <p>
                          <b>Gold Purity</b>
                          <br />
                          {viewLoan.collateral.goldPurity}
                        </p>

                        <p>
                          <b>Gold Value</b>
                          <br />₹{" "}
                          {Number(viewLoan.collateral.goldValue).toLocaleString(
                            "en-IN",
                          )}
                        </p>

                        <hr />
                      </>
                    )}

                    {viewLoan.collateral?.vehicleType && (
                      <>
                        <p>
                          <b>Vehicle Type</b>
                          <br />
                          {viewLoan.collateral.vehicleType}
                        </p>

                        <p>
                          <b>Vehicle Number</b>
                          <br />
                          {viewLoan.collateral.vehicleNumber}
                        </p>

                        <p>
                          <b>Vehicle Value</b>
                          <br />₹{" "}
                          {Number(
                            viewLoan.collateral.vehicleValue,
                          ).toLocaleString("en-IN")}
                        </p>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
      <ConfirmDialog
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
          setLoanToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Loan"
        message={`Delete Loan ${loanToDelete?.loanId}?`}
        confirmText="Delete"
      />
    </>
  );
}

export default LoanTable;
