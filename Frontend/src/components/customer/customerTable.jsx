import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILE_BASE_URL } from "../../api/axiosInstance";
import AgGridTable from "../common/AgGridTable";
import {
  fetchCustomers,
  deleteCustomer,
  updateCustomer,
} from "../../redux/customerSlice";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../common/ConfirmDialog";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
function CustomerTable({ setShowModal, setSelectedCustomer, search }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, loading } = useSelector((state) => state.customer);
  const [showView, setShowView] = useState(false);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCustomerToDelete, setSelectedCustomerToDelete] =
    useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge bg="success">Active</Badge>;

      case "Pending":
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );

      case "Draft":
        return <Badge bg="secondary">Draft</Badge>;

      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;

      case "Verified":
        return <Badge bg="primary">Verified</Badge>;

      default:
        return (
          <Badge bg="light" text="dark">
            {status}
          </Badge>
        );
    }
  };
  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.customerName?.toLowerCase().includes(keyword) ||
      customer.mobileNumber?.toLowerCase().includes(keyword) ||
      customer.customerId?.toLowerCase().includes(keyword)
    );
  });
  const columnDefs = [
    {
      headerName: "Customer ID",
      field: "customerId",
    },
    {
      headerName: "Name",
      field: "customerName",
    },
    {
      headerName: "Phone",
      field: "mobileNumber",
    },
    {
      headerName: "Branch",
      field: "branch",
    },
    {
      headerName: "KYC",
      field: "kycStatus",
      cellRenderer: (params) => getStatusBadge(params.value),
    },
    {
      headerName: "Remarks",
      field: "remarks",
      flex: 2,
      cellRenderer: (params) => {
        if (params.data.kycStatus !== "Rejected") return "-";

        return (
          <div>
            <div>{params.value}</div>

            <button
              className="btn btn-sm btn-outline-primary mt-2"
              onClick={() => {
                setSelectedCustomer(params.data);
                setShowModal(true);
              }}
            >
              Reupload
            </button>
          </div>
        );
      },
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params) => getStatusBadge(params.value),
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }
  const handleDelete = async () => {
    if (!selectedCustomerToDelete) return;

    try {
      await dispatch(deleteCustomer(selectedCustomerToDelete._id)).unwrap();

      setShowDelete(false);
      setSelectedCustomerToDelete(null);

      setSnackbar({
        open: true,
        message: "Customer deleted successfully.",
        severity: "success",
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        dialogClassName="customer-view-modal"
        backdrop="static"
        enforceFocus
      >
        <Modal.Header closeButton>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {viewCustomer && (
            <Row className="g-3">
              {/* Column 1 */}
              <Col lg={3} md={6}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Personal Details
                    </h6>

                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>ID</b>
                        <br />
                        {viewCustomer.customerId}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Name</b>
                        <br />
                        {viewCustomer.customerName}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Father</b>
                        <br />
                        {viewCustomer.fatherName}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>DOB</b>
                        <br />
                        {viewCustomer.dateOfBirth?.substring(0, 10)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Gender</b>
                        <br />
                        {viewCustomer.gender}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Phone</b>
                        <br />
                        {viewCustomer.mobileNumber}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Email</b>
                        <br />
                        {viewCustomer.email}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>Status</b>
                        <br />
                        {getStatusBadge(viewCustomer.status)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <b>KYC</b>
                        <br />
                        {getStatusBadge(viewCustomer.kycStatus)}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              {/* Column 2 */}
              <Col lg={3} md={6}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Address
                    </h6>

                    <p>
                      <b>Door :</b> {viewCustomer.address?.doorNumber}
                    </p>
                    <p>
                      <b>Street :</b> {viewCustomer.address?.street}
                    </p>
                    <p>
                      <b>Village :</b> {viewCustomer.address?.village}
                    </p>
                    <p>
                      <b>City :</b> {viewCustomer.address?.city}
                    </p>
                    <p>
                      <b>District :</b> {viewCustomer.address?.district}
                    </p>
                    <p>
                      <b>State :</b> {viewCustomer.address?.state}
                    </p>
                    <p>
                      <b>PIN :</b> {viewCustomer.address?.pinCode}
                    </p>

                    <hr />

                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Identity
                    </h6>

                    <p>
                      <b>Aadhaar</b>
                      <br />
                      {viewCustomer.identity?.aadhaarNumber}
                    </p>
                    <p>
                      <b>PAN</b>
                      <br />
                      {viewCustomer.identity?.panNumber}
                    </p>
                    <p>
                      <b>DL</b>
                      <br />
                      {viewCustomer.identity?.drivingLicense}
                    </p>
                    <p>
                      <b>Voter ID</b>
                      <br />
                      {viewCustomer.identity?.voterId}
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Column 3 */}
              <Col lg={3} md={6}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Bank
                    </h6>

                    <p>
                      <b>Bank</b>
                      <br />
                      {viewCustomer.bank?.bankName}
                    </p>
                    <p>
                      <b>Account</b>
                      <br />
                      {viewCustomer.bank?.accountNumber}
                    </p>
                    <p>
                      <b>IFSC</b>
                      <br />
                      {viewCustomer.bank?.ifscCode}
                    </p>
                    <p>
                      <b>Branch</b>
                      <br />
                      {viewCustomer.bank?.branchName}
                    </p>

                    <hr />

                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Nominee
                    </h6>

                    <p>
                      <b>Name</b>
                      <br />
                      {viewCustomer.nominee?.name}
                    </p>
                    <p>
                      <b>Relation</b>
                      <br />
                      {viewCustomer.nominee?.relation}
                    </p>
                    <p>
                      <b>Age</b>
                      <br />
                      {viewCustomer.nominee?.age}
                    </p>
                    <p>
                      <b>Phone</b>
                      <br />
                      {viewCustomer.nominee?.phoneNumber}
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              {/* Column 4 */}
              <Col lg={3} md={6}>
                <Card className="shadow-sm h-100 border-0">
                  <Card.Body>
                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Guarantor
                    </h6>

                    <p>
                      <b>Name</b>
                      <br />
                      {viewCustomer.guarantor?.name}
                    </p>
                    <p>
                      <b>Phone</b>
                      <br />
                      {viewCustomer.guarantor?.phoneNumber}
                    </p>
                    <p>
                      <b>Occupation</b>
                      <br />
                      {viewCustomer.guarantor?.occupation}
                    </p>
                    <p>
                      <b>Income</b>
                      <br />₹ {viewCustomer.guarantor?.monthlyIncome}
                    </p>

                    <div className="border rounded p-2 bg-light mb-3">
                      {viewCustomer.guarantor?.address}
                    </div>

                    <h6 className="fw-bold text-secondary border-bottom pb-2">
                      Documents
                    </h6>

                    <div className="d-grid gap-2">
                      <a
                        className="btn docs btn-sm"
                        href={`${FILE_BASE_URL}${viewCustomer.documents?.aadhaarFront}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Aadhaar Front
                      </a>

                      <a
                        className="btn docs btn-sm"
                        href={`${FILE_BASE_URL}${viewCustomer.documents?.aadhaarBack}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Aadhaar Back
                      </a>

                      <a
                        className="btn docs btn-sm"
                        href={`${FILE_BASE_URL}${viewCustomer.documents?.panCard}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        PAN Card
                      </a>

                      <a
                        className="btn docs btn-sm"
                        href={`${FILE_BASE_URL}${viewCustomer.documents?.passportPhoto}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Passport
                      </a>

                      <a
                        className="btn docs btn-sm"
                        href={`${FILE_BASE_URL}${viewCustomer.documents?.signature}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Signature
                      </a>

                      <a
                        className="btn docs btn-sm"
                        href={`${FILE_BASE_URL}${viewCustomer.documents?.addressProof}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Address Proof
                      </a>

                      <a
                        className="btn docs btn-sm"
                        href={`${FILE_BASE_URL}${viewCustomer.documents?.incomeProof}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Income Proof
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>

      <AgGridTable
        rowData={filteredCustomers}
        columnDefs={columnDefs}
        showActions={true}
        onView={(row) => {
          setViewCustomer(row);
          setShowView(true);
        }}
        onEdit={(row) => {
          setSelectedCustomer(row);
          setShowModal(true);
        }}
        onDelete={(row) => {
          setSelectedCustomerToDelete(row);
          setShowDelete(true);
        }}
      />
      <ConfirmDialog
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
          setSelectedCustomerToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete "${selectedCustomerToDelete?.customerName}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

export default CustomerTable;
