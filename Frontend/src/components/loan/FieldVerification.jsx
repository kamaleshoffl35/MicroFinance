import { useState, useRef } from "react";
import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";

import AppSnackbar from "../common/AppSnackbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/customerSlice";
import { fetchLoans } from "../../redux/loanSlice";
import { FILE_BASE_URL } from "../../api/axiosInstance";
import { Modal } from "react-bootstrap";
import { addFieldVerification } from "../../redux/fieldVerificationSlice";
function FieldVerification() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const dispatch = useDispatch();

  const { customers, loading } = useSelector((state) => state.customer);
  const { loans } = useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchLoans());
  }, [dispatch]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const documents = selectedLoan?.customer?.documents;
  const [previewImage, setPreviewImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const customer = selectedLoan?.customer;
  const kycStatus = customer?.kycStatus || "Pending";

  const initialFormData = {
    customerName: "",
    loanType: "",

    addressVerified: false,
    incomeVerified: false,
    businessVerified: false,

    gpsLocation: "",

    remarks: "",

    housePhoto: null,
    businessPhoto: null,
    customerPhoto: null,
  };
  const housePhotoRef = useRef(null);
  const businessPhotoRef = useRef(null);
  const customerPhotoRef = useRef(null);
  const [formData, setFormData] = useState(initialFormData);

  const [submitting, setSubmitting] = useState(false);
  const resetForm = () => {
    setFormData(initialFormData);

    setSelectedLoan(null);
    setPreviewImage("");
    setShowPreview(false);

    // Clear file inputs
    if (housePhotoRef.current) housePhotoRef.current.value = "";
    if (businessPhotoRef.current) businessPhotoRef.current.value = "";
    if (customerPhotoRef.current) customerPhotoRef.current.value = "";
  };
  const DocumentPreview = ({ title, file }) => {
    if (!file) return null;

    return (
      <Col md={4}>
        <Card className="border-0 shadow-sm">
          <Card.Body className="text-center">
            <h6 className="mb-3">{title}</h6>

            <img
              src={`${FILE_BASE_URL}${file}`}
              alt={title}
              className="img-fluid rounded border"
              style={{
                height: "180px",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const openPreview = (file) => {
    setPreviewImage(`${FILE_BASE_URL}${file}`);
    setShowPreview(true);
  };
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "customerName") {
      const loan = loans.find((item) => item.customer?._id === value);

      setSelectedLoan(loan);

      setFormData((prev) => ({
        ...prev,
        customerName: value,
        loanType: loan?._id || "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFile = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const body = new FormData();

      Object.keys(formData).forEach((key) => {
        body.append(key, formData[key]);
      });

      await dispatch(addFieldVerification(body)).unwrap();

      setSnackbar({
        open: true,
        message: "Field Verification Submitted Successfully",
        severity: "success",
      });

      resetForm();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err || "Something went wrong",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };
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

      <Card className="form-card shadow-sm border-0 rounded-4 mt-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Customer */}
            <h5 className="fw-bold mb-4">Customer Information</h5>

            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Customer Name</Form.Label>

                <Form.Select
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                >
                  <option value="">
                    {loading ? "Loading Customers..." : "Select Customer"}
                  </option>

                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.customerName}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={6}>
                <Form.Label>Loan Type</Form.Label>

                <Form.Control value={selectedLoan?.loanType || ""} readOnly />
              </Col>
            </Row>

            {selectedLoan && (
              <Row className="mt-4 g-4">
                <Col lg={6} md={6}>
                  <Card className="shadow-sm h-100 border-0 rounded-4">
                    <Card.Body>
                      <h5 className="fw-bold mb-4">Loan Details</h5>

                      <Row className="g-3">
                        <Col xs={6}>
                          <small className="text-muted">Loan ID</small>
                          <h6>{selectedLoan.loanId}</h6>
                        </Col>

                        <Col xs={6}>
                          <small className="text-muted">Loan Type</small>
                          <h6>{selectedLoan.loanType}</h6>
                        </Col>

                        <Col xs={6}>
                          <small className="text-muted">Amount</small>
                          <h6>₹ {selectedLoan.loanAmount}</h6>
                        </Col>

                        <Col xs={6}>
                          <small className="text-muted">Interest</small>
                          <h6>{selectedLoan.interestRate}%</h6>
                        </Col>

                        <Col xs={6}>
                          <small className="text-muted">Tenure</small>
                          <h6>{selectedLoan.tenure} Months</h6>
                        </Col>

                        <Col xs={6}>
                          <small className="text-muted">Repayment</small>
                          <h6>{selectedLoan.repaymentType}</h6>
                        </Col>

                        <Col xs={12}>
                          <small className="text-muted">Purpose</small>
                          <h6>{selectedLoan.loanPurpose}</h6>
                        </Col>

                        <Col xs={6}>
                          <small className="text-muted">Status</small>
                          <h6 className="text-warning">
                            {selectedLoan.status}
                          </h6>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={6} md={6}>
                  <Card className="shadow-sm h-100 border-0 rounded-4">
                    <Card.Body className="d-flex flex-column">
                      <h5 className="fw-bold mb-4">Customer Documents</h5>

                      <Row className="g-3">
                        <Col sm={6}>
                          <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => openPreview(documents.aadhaarFront)}
                          >
                            Aadhaar Front
                          </Button>
                        </Col>

                        <Col sm={6}>
                          <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => openPreview(documents.aadhaarBack)}
                          >
                            Aadhaar Back
                          </Button>
                        </Col>

                        <Col sm={6}>
                          <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => openPreview(documents.panCard)}
                          >
                            PAN Card
                          </Button>
                        </Col>

                        <Col sm={6}>
                          <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => openPreview(documents.passportPhoto)}
                          >
                            Passport Photo
                          </Button>
                        </Col>

                        <Col sm={6}>
                          <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => openPreview(documents.signature)}
                          >
                            Signature
                          </Button>
                        </Col>

                        <Col sm={6}>
                          <Button
                            variant="outline-secondary"
                            className="w-100"
                            onClick={() => openPreview(documents.incomeProof)}
                          >
                            Income Proof
                          </Button>
                        </Col>
                      </Row>

                      <div className="flex-grow-1"></div>

                      <div className="d-flex align-items-center mt-2">
                        <div
                          className="flex-grow-1"
                          style={{
                            borderTop: "2px dashed #d5d5d5",
                          }}
                        ></div>

                        <Badge
                          bg={
                            kycStatus === "Verified"
                              ? "success"
                              : kycStatus === "Rejected"
                                ? "danger"
                                : "warning"
                          }
                          text={kycStatus === "Pending" ? "dark" : "white"}
                          pill
                          className="mx-3 px-3 py-2 fs-6"
                        >
                          KYC : {kycStatus}
                        </Badge>

                        <div
                          className="flex-grow-1"
                          style={{
                            borderTop: "2px dashed #d5d5d5",
                          }}
                        ></div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}

            <hr className="my-4" />

            <h5 className="fw-bold mb-4">Verification Checklist</h5>

            <Row className="g-4">
              <Col md={4}>
                <Form.Check
                  type="switch"
                  label="Address Verified"
                  name="addressVerified"
                  checked={formData.addressVerified}
                  onChange={handleChange}
                />
              </Col>

              <Col md={4}>
                <Form.Check
                  type="switch"
                  label="Income Verified"
                  name="incomeVerified"
                  checked={formData.incomeVerified}
                  onChange={handleChange}
                />
              </Col>

              <Col md={4}>
                <Form.Check
                  type="switch"
                  label="Business Verified"
                  name="businessVerified"
                  checked={formData.businessVerified}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <hr className="my-4" />

            {/* GPS */}

            <h5 className="fw-bold mb-4">GPS Location</h5>

            <Row>
              <Col md={12}>
                <Form.Label>Latitude & Longitude</Form.Label>

                <Form.Control
                  placeholder="11.02345, 77.00124"
                  name="gpsLocation"
                  value={formData.gpsLocation}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <hr className="my-4" />

            <h5 className="fw-bold mb-4">Verification Photos</h5>

            <Row className="g-4">
              <Col md={4}>
                <Form.Label>House Photo</Form.Label>

                <Form.Control
                  ref={housePhotoRef}
                  type="file"
                  name="housePhoto"
                  onChange={handleFile}
                />
              </Col>

              <Col md={4}>
                <Form.Label>Business Photo</Form.Label>

                <Form.Control
                  type="file"
                  ref={businessPhotoRef}
                  name="businessPhoto"
                  onChange={handleFile}
                />
              </Col>

              <Col md={4}>
                <Form.Label>Customer Photo</Form.Label>

                <Form.Control
                  type="file"
                  ref={customerPhotoRef}
                  name="customerPhoto"
                  onChange={handleFile}
                />
              </Col>
            </Row>

            <hr className="my-4" />

            <h5 className="fw-bold mb-4">Officer Remarks</h5>

            <Row>
              <Col md={12}>
                <Form.Label>Remarks</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter verification remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <hr className="my-4" />

            <h5 className="fw-bold mb-4">Verification Status</h5>

            <Card className="bg-light border-0 rounded-3">
              <Card.Body>
                <Row>
                  <Col md={3}>
                    <small className="text-muted">Address</small>

                    <h6 className="mt-1">
                      {formData.addressVerified ? "Verified" : "Pending"}
                    </h6>
                  </Col>

                  <Col md={3}>
                    <small className="text-muted">Income</small>

                    <h6 className="mt-1">
                      {formData.incomeVerified ? "Verified" : "Pending"}
                    </h6>
                  </Col>

                  <Col md={3}>
                    <small className="text-muted">Business</small>

                    <h6 className="mt-1">
                      {formData.businessVerified ? "Verified" : "Pending"}
                    </h6>
                  </Col>

                  <Col md={3}>
                    <small className="text-muted">Status</small>

                    <h6 className="text-warning mt-1">Pending</h6>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn add text-white px-4"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Verification"}
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Modal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>Document Preview</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <img
            src={previewImage}
            alt="Document"
            className="img-fluid rounded"
            style={{ maxHeight: "500px" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FieldVerification;
