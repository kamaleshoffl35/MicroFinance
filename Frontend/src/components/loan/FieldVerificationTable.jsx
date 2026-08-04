import AgGridTable from "../common/AgGridTable";
import Badge from "react-bootstrap/Badge";
import ConfirmDialog from "../common/ConfirmDialog";
import AppSnackbar from "../common/AppSnackbar";
import {
  Modal,
  Card,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { fetchFieldVerifications } from "../../redux/fieldVerificationSlice";

import { FILE_BASE_URL } from "../../api/axiosInstance";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function FieldVerificationTable({

  setShowModal,
  setSelectedVerification,
}) {
  const dispatch = useDispatch();

  const { fieldVerifications } = useSelector(
    (state) => state.fieldVerification
  );

  const [showView, setShowView] = useState(false);
  const [viewData, setViewData] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchFieldVerifications());
  }, [dispatch]);

  const rowData = fieldVerifications.map((item) => ({
    ...item,
    customer:
      item.customerName?.customerName || "-",
    loan:
      item.loanType?.loanType || "-",
  }));

const filteredRows = rowData.filter((item) => {
  const keyword = search.toLowerCase();

  const matchesSearch =
    item.customer.toLowerCase().includes(keyword) ||
    item.loan.toLowerCase().includes(keyword);

  const matchesStatus =
    statusFilter === "" ||
    item.status?.toLowerCase() === statusFilter.toLowerCase();

  return matchesSearch && matchesStatus;
});
  const statusBadge = (status) => {
    switch (status) {
      case "Verified":
        return <Badge bg="success">Verified</Badge>;

      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;

      default:
        return <Badge bg="warning">Pending</Badge>;
    }
  };

  const columnDefs = [
    {
      headerName: "Customer",
      field: "customer",
    },
    {
      headerName: "Loan Type",
      field: "loan",
    },
    {
      headerName: "GPS",
      field: "gpsLocation",
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (p) => statusBadge(p.value),
    },
  ];

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteFieldVerification(deleteData._id)
      ).unwrap();

      setSnackbar({
        open: true,
        message: "Deleted Successfully",
        severity: "success",
      });

      setShowDelete(false);
    } catch {
      setSnackbar({
        open: true,
        message: "Delete Failed",
        severity: "error",
      });
    }
  };

  return (
    <>
      <AppSnackbar
        {...snackbar}
        onClose={() =>
          setSnackbar((p) => ({
            ...p,
            open: false,
          }))
        }
      />
<div className="d-flex align-items-center gap-2 mb-3">

  <Form.Control
    placeholder="Search by Customer or Loan Type..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <Form.Select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={{ maxWidth: "180px" }}
  >
    <option value="">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Verified">Verified</option>
    <option value="Rejected">Rejected</option>
  </Form.Select>

  <Button
  variant=""
    className="add text-nowrap text-white"
    onClick={() => {
      setSelectedVerification(null);
      setShowModal(true);
    }}
  >
    Add Field Verification
  </Button>

</div>
      <AgGridTable
        rowData={filteredRows}
        columnDefs={columnDefs}
        showActions
        onView={(row) => {
          setViewData(row);
          setShowView(true);
        }}
        onEdit={(row) => {
          setSelectedVerification(row);
          setShowModal(true);
        }}
        onDelete={(row) => {
          setDeleteData(row);
          setShowDelete(true);
        }}
      />

      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Field Verification Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {viewData && (
            <Row className="g-3">

              <Col md={4}>
                <Card>
                  <Card.Body>

                    <h6>Customer</h6>

                    <ListGroup variant="flush">

                      <ListGroup.Item>
                        <b>Name</b>

                        <br />

                        {viewData.customerName?.customerName}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Loan Type</b>

                        <br />

                        {viewData.loanType?.loanType}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Status</b>

                        <br />

                        {statusBadge(viewData.status)}
                      </ListGroup.Item>

                    </ListGroup>

                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>

                    <h6>Verification</h6>

                    <ListGroup variant="flush">

                      <ListGroup.Item>
                        Address :
                        {viewData.addressVerified
                          ? " Yes"
                          : " No"}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Income :
                        {viewData.incomeVerified
                          ? " Yes"
                          : " No"}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Business :
                        {viewData.businessVerified
                          ? " Yes"
                          : " No"}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        GPS

                        <br />

                        {viewData.gpsLocation}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Remarks

                        <br />

                        {viewData.remarks}
                      </ListGroup.Item>

                    </ListGroup>

                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>

                    <h6>Verification Photos</h6>

                    <Row>

                      {[
                        viewData.housePhoto,
                        viewData.businessPhoto,
                        viewData.customerPhoto,
                      ].map((img, i) =>
                        img ? (
                          <Col
                            xs={12}
                            className="mb-3"
                            key={i}
                          >
                            <Image
                              src={`${FILE_BASE_URL}${img}`}
                              fluid
                              rounded
                            />
                          </Col>
                        ) : null
                      )}

                    </Row>

                  </Card.Body>
                </Card>
              </Col>

            </Row>
          )}
        </Modal.Body>
      </Modal>

      <ConfirmDialog
        show={showDelete}
        onHide={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Verification"
        message="Delete this verification?"
        confirmText="Delete"
      />
    </>
  );
}

export default FieldVerificationTable;