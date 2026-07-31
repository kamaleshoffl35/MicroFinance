import { useEffect, useMemo, useState } from "react";
import { Card, Form, Row, Col, Badge, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/customerSlice";
import { FILE_BASE_URL } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { createLoan, updateLoan, fetchLoans } from "../../redux/loanSlice";
import AppSnackbar from "../../components/common/AppSnackbar";
import { fetchLoanTypes } from "../../redux/loanTypeSlice";
import { fetchTenures } from "../../redux/tenureSlice";
import { fetchRepaymentTypes } from "../../redux/repaymentTypeSlice";
function LoanApplication({
  selectedLoan,
  setSelectedLoan,
  showModal,
  setShowModal,
}) {
  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.customer);
  const { loanTypes } = useSelector((state) => state.loanType);
  const { tenures } = useSelector((state) => state.tenure);
  const { repaymentTypes } = useSelector((state) => state.repaymentType);
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [loanType, setLoanType] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [goldPhoto, setGoldPhoto] = useState(null);
  const [vehiclePhoto, setVehiclePhoto] = useState(null);
  // Loan Details
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [repaymentType, setRepaymentType] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");

  // Gold Loan
  const [goldWeight, setGoldWeight] = useState("");
  const [goldPurity, setGoldPurity] = useState("");
  const [goldValue, setGoldValue] = useState("");

  // Vehicle Loan
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleValue, setVehicleValue] = useState("");
  const handlePreview = (image) => {
    setPreviewImage(image);
    setShowPreview(true);
  };
  useEffect(() => {
    if (!selectedLoan) return;

    setSelectedCustomer(selectedLoan.customer?._id || "");
    setLoanType(selectedLoan.loanType || "");
    setLoanAmount(selectedLoan.loanAmount || "");
    setInterestRate(selectedLoan.interestRate || "");
    setTenure(selectedLoan.tenure || "");
    setRepaymentType(selectedLoan.repaymentType || "");
    setLoanPurpose(selectedLoan.loanPurpose || "");

    setGoldWeight(selectedLoan.collateral?.goldWeight || "");
    setGoldPurity(selectedLoan.collateral?.goldPurity || "");
    setGoldValue(selectedLoan.collateral?.goldValue || "");

    setVehicleType(selectedLoan.collateral?.vehicleType || "");
    setVehicleNumber(selectedLoan.collateral?.vehicleNumber || "");
    setVehicleValue(selectedLoan.collateral?.vehicleValue || "");
  }, [selectedLoan]);
  useEffect(() => {
    if (!loanTypes.length) {
      dispatch(fetchLoanTypes());
    }
  }, [dispatch, loanTypes.length]);
  const handleClose = () => {
    setShowPreview(false);
    setPreviewImage("");
  };
  useEffect(() => {
    if (!customers.length) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customers.length]);
  useEffect(() => {
    dispatch(fetchTenures());
  }, [dispatch]);
  useEffect(() => {
    if (!repaymentTypes.length) {
      dispatch(fetchRepaymentTypes());
    }
  }, [dispatch, repaymentTypes.length]);
  const customer = useMemo(() => {
    return customers.find((c) => c._id === selectedCustomer);
  }, [customers, selectedCustomer]);

  const documents = customer?.documents;

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenure) return 0;

    const P = Number(loanAmount);
    const R = Number(interestRate) / 12 / 100;
    const N = Number(tenure);

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    return emi.toFixed(2);
  };

  const validate = () => {
    if (!selectedCustomer) return "Please select customer";

    if (!loanType) return "Please select loan type";

    if (!loanAmount) return "Please enter loan amount";

    if (!interestRate) return "Please enter interest rate";

    if (!tenure) return "Please select tenure";

    if (!loanPurpose) return "Please enter loan purpose";

    if (loanType === "Gold Loan") {
      if (!goldWeight) return "Enter gold weight";
      if (!goldPurity) return "Select gold purity";
      if (!goldValue) return "Enter gold value";
      if (!goldPhoto && !selectedLoan?.collateral?.goldPhoto)
        return "Upload gold photo";
    }

    if (loanType === "Vehicle Loan") {
      if (!vehicleType) return "Select vehicle type";
      if (!vehicleNumber) return "Enter vehicle number";
      if (!vehicleValue) return "Enter vehicle value";
      if (!vehiclePhoto && !selectedLoan?.collateral?.vehiclePhoto)
        return "Upload vehicle photo";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();

    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "warning",
      });
      return;
    }

    setSubmitting(true);

    try {
      if (selectedLoan) {
        await dispatch(
          updateLoan({
            id: selectedLoan._id,
            loanData: {
              customerId: selectedCustomer,
              loanType,
              loanAmount,
              interestRate,
              tenure,
              repaymentType,
              loanPurpose,
              goldWeight,
              goldPurity,
              goldValue,
              vehicleType,
              vehicleNumber,
              vehicleValue,
              goldPhoto,
              vehiclePhoto,
            },
          }),
        ).unwrap();
      } else {
        await dispatch(
          createLoan({
            customerId: selectedCustomer,
            loanType,
            loanAmount,
            interestRate,
            tenure,
            repaymentType,
            loanPurpose,
            goldWeight,
            goldPurity,
            goldValue,
            vehicleType,
            vehicleNumber,
            vehicleValue,
            goldPhoto,
            vehiclePhoto,
            status: "Pending",
          }),
        ).unwrap();
      }

      setSnackbar({
        open: true,
        message: "Loan Application submitted successfully.",
        severity: "success",
      });
      resetForm();
      await dispatch(fetchLoans());
      if (setSelectedLoan) {
        setSelectedLoan(null);
      }

      if (typeof setShowModal === "function") {
        setShowModal(false);
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          err.response?.data?.message || err.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedCustomer("");
    setLoanType("");

    setLoanAmount("");
    setInterestRate("");
    setTenure("");
    setRepaymentType("");
    setLoanPurpose("");

    setGoldWeight("");
    setGoldPurity("");
    setGoldValue("");

    setVehicleType("");
    setVehicleNumber("");
    setVehicleValue("");

    setGoldPhoto(null);
    setVehiclePhoto(null);

    setPreviewImage("");
    setShowPreview(false);
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
            <h5 className="fw-bold mb-4">Customer Information</h5>

            <Row>
              <Col md={6}>
                <Form.Label>
                  Customer <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="">Select Customer</option>

                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.customerName} - {customer.mobileNumber} -{" "}
                      {customer.address?.city}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {customer && (
              <>
                <hr className="my-4" />

                <Row className="g-3">
                  <Col md={4}>
                    <strong>Customer ID</strong>
                    <div>{customer.customerId || customer._id.slice(-6)}</div>
                  </Col>

                  <Col md={4}>
                    <strong>Mobile</strong>
                    <div>{customer.mobileNumber}</div>
                  </Col>

                  <Col md={4}>
                    <strong>Branch</strong>
                    <div>{customer.branch}</div>
                  </Col>

                  <Col md={4}>
                    <strong>Address</strong>
                    <div>
                      {customer.address &&
                        `${customer.address.doorNumber}, ${customer.address.street},
      ${customer.address.village}, ${customer.address.city},
      ${customer.address.district},
      ${customer.address.state} - ${customer.address.pinCode}`}
                    </div>
                  </Col>

                  <Col md={4}>
                    <strong>KYC Status</strong>
                    <div>
                      <Badge
                        bg={
                          customer.kycStatus === "Verified"
                            ? "success"
                            : customer.kycStatus === "Rejected"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {customer.kycStatus || "Pending"}
                      </Badge>
                    </div>
                  </Col>

                  <Col md={4}>
                    <strong>Occupation</strong>
                    <div>{customer.occupation}</div>
                  </Col>

                  <Col md={4}>
                    <strong>Monthly Income</strong>
                    <div>
                      ₹
                      {customer.monthlyIncome
                        ? Number(customer.monthlyIncome).toLocaleString("en-IN")
                        : 0}
                    </div>
                  </Col>

                  <Col md={4}>
                    <strong>Existing Active Loans</strong>
                    <div>{customer.activeLoans ?? 0}</div>
                  </Col>

                  <Col md={4}>
                    <strong>Outstanding</strong>
                    <div>
                      ₹
                      {Number(customer.outstandingAmount ?? 0).toLocaleString(
                        "en-IN",
                      )}
                    </div>
                  </Col>
                </Row>
              </>
            )}

            {customer && documents && (
              <>
                <hr className="my-4" />

                <h5 className="fw-bold mb-4">Customer Documents</h5>

                <Row className="g-3">
                  <Col md={4}>
                    <Card className="border rounded-3">
                      <Card.Body className="text-center">
                        <h6>Aadhaar Front</h6>

                        <img
                          src={`${FILE_BASE_URL}${documents.aadhaarFront}`}
                          alt="Aadhaar Front"
                          className="img-fluid rounded mt-2"
                          onClick={() =>
                            handlePreview(
                              `${FILE_BASE_URL}${documents.aadhaarFront}`,
                            )
                          }
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="border rounded-3">
                      <Card.Body className="text-center">
                        <h6>Aadhaar Back</h6>

                        <img
                          src={`${FILE_BASE_URL}${documents.aadhaarBack}`}
                          alt="Aadhaar Back"
                          className="img-fluid rounded mt-2"
                          onClick={() =>
                            handlePreview(
                              `${FILE_BASE_URL}${documents.aadhaarBack}`,
                            )
                          }
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="border rounded-3">
                      <Card.Body className="text-center">
                        <h6>PAN Card</h6>

                        <img
                          src={`${FILE_BASE_URL}${documents.panCard}`}
                          alt="PAN"
                          className="img-fluid rounded mt-2"
                          onClick={() =>
                            handlePreview(
                              `${FILE_BASE_URL}${documents.panCard}`,
                            )
                          }
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="border rounded-3">
                      <Card.Body className="text-center">
                        <h6>Passport Photo</h6>

                        <img
                          src={`${FILE_BASE_URL}${documents.passportPhoto}`}
                          alt="Passport"
                          className="img-fluid rounded mt-2"
                          onClick={() =>
                            handlePreview(
                              `${FILE_BASE_URL}${documents.passportPhoto}`,
                            )
                          }
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="border rounded-3">
                      <Card.Body className="text-center">
                        <h6>Signature</h6>

                        <img
                          src={`${FILE_BASE_URL}${documents.signature}`}
                          alt="Signature"
                          className="img-fluid rounded mt-2"
                          onClick={() =>
                            handlePreview(
                              `${FILE_BASE_URL}${documents.signature}`,
                            )
                          }
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={4}>
                    <Card className="border rounded-3">
                      <Card.Body className="text-center">
                        <h6>Income Proof</h6>

                        <img
                          src={`${FILE_BASE_URL}${documents.incomeProof}`}
                          alt="Income Proof"
                          className="img-fluid rounded mt-2"
                          onClick={() =>
                            handlePreview(
                              `${FILE_BASE_URL}${documents.incomeProof}`,
                            )
                          }
                          style={{
                            height: "180px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
            <hr className="my-4" />

            <h5 className="fw-bold mb-4">Loan Details</h5>

            <Row className="g-3">
              <Col md={4}>
                <Form.Label>
                  Loan Type <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={loanType}
                  onChange={(e) => {
                    const value = e.target.value;

                    setLoanType(value);

                    if (value !== "Gold Loan") {
                      setGoldPhoto(null);
                    }

                    if (value !== "Vehicle Loan") {
                      setVehiclePhoto(null);
                    }
                  }}
                >
                  <option value="">Select Loan Type</option>

                  {loanTypes.map((type) => (
                    <option key={type._id} value={type.loanTypeName}>
                      {type.loanTypeName}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label>
                  Principal Amount <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                  type="number"
                  placeholder="Enter Loan Amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </Col>

              <Col md={4}>
                <Form.Label>
                  Interest Rate (%) <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                  type="number"
                  placeholder="18"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </Col>

              <Col md={4}>
                <Form.Label>
                  Tenure <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                >
                  <option value="">Select Tenure</option>

                  {tenures.map((item) => (
                    <option key={item._id} value={item.tenureName}>
                      {item.tenureName}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={4}>
                <Form.Label>
                  Repayment Type <span className="text-danger">*</span>
                </Form.Label>

                <Form.Select
                  value={repaymentType}
                  onChange={(e) => setRepaymentType(e.target.value)}
                >
                  <option value="">Select Repayment Type</option>

                  {repaymentTypes.map((item) => (
                    <option key={item._id} value={item.repaymentTypeName}>
                      {item.repaymentTypeName}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={12}>
                <Form.Label>
                  Loan Purpose <span className="text-danger">*</span>
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter purpose of loan"
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                />
              </Col>
            </Row>

            {(loanType === "Gold Loan" || loanType === "Vehicle Loan") && (
              <>
                <hr className="my-4" />

                <h5 className="fw-bold mb-4">Collateral Details</h5>

                <Row className="g-3">
                  {loanType === "Gold Loan" && (
                    <>
                      <Col md={4}>
                        <Form.Label>
                          Gold Weight (grams)
                          <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                          type="number"
                          placeholder="Enter Gold Weight"
                          value={goldWeight}
                          onChange={(e) => setGoldWeight(e.target.value)}
                        />
                      </Col>

                      <Col md={4}>
                        <Form.Label>
                          Purity
                          <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Select
                          value={goldPurity}
                          onChange={(e) => setGoldPurity(e.target.value)}
                        >
                          <option value="">Select Purity</option>
                          <option>18K</option>
                          <option>20K</option>
                          <option>22K</option>
                          <option>24K</option>
                        </Form.Select>
                      </Col>

                      <Col md={4}>
                        <Form.Label>
                          Estimated Value
                          <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                          type="number"
                          placeholder="₹ Enter Estimated Value"
                          value={goldValue}
                          onChange={(e) => setGoldValue(e.target.value)}
                        />
                      </Col>
                      <Col md={12}>
                        <Form.Label>
                          Gold Photo <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => setGoldPhoto(e.target.files[0])}
                        />

                        {goldPhoto && (
                          <img
                            src={URL.createObjectURL(goldPhoto)}
                            alt="Gold Preview"
                            className="img-fluid rounded mt-3 border"
                            style={{
                              maxHeight: "220px",
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </Col>
                    </>
                  )}

                  {loanType === "Vehicle Loan" && (
                    <>
                      <Col md={4}>
                        <Form.Label>
                          Vehicle Type
                          <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Select
                          value={vehicleType}
                          onChange={(e) => setVehicleType(e.target.value)}
                        >
                          <option value="">Select Vehicle</option>
                          <option>Bike</option>
                          <option>Car</option>
                          <option>Auto</option>
                          <option>Commercial Vehicle</option>
                        </Form.Select>
                      </Col>

                      <Col md={4}>
                        <Form.Label>
                          Registration Number
                          <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                          placeholder="TN 38 AB 1234"
                          value={vehicleNumber}
                          onChange={(e) => setVehicleNumber(e.target.value)}
                        />
                      </Col>

                      <Col md={4}>
                        <Form.Label>
                          Estimated Value
                          <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                          type="number"
                          placeholder="₹ Enter Vehicle Value"
                          value={vehicleValue}
                          onChange={(e) => setVehicleValue(e.target.value)}
                        />
                      </Col>
                      <Col md={12}>
                        <Form.Label>
                          Vehicle Photo <span className="text-danger">*</span>
                        </Form.Label>

                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => setVehiclePhoto(e.target.files[0])}
                        />

                        {vehiclePhoto && (
                          <img
                            src={URL.createObjectURL(vehiclePhoto)}
                            alt="Vehicle Preview"
                            className="img-fluid rounded mt-3 border"
                            style={{
                              maxHeight: "220px",
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </Col>
                    </>
                  )}
                </Row>
              </>
            )}
            <hr className="my-4" />

            <h5 className="fw-bold mb-4">Loan Summary</h5>

            <Card className="bg-light border-0 rounded-3">
              <Card.Body>
                <Row className="gy-3">
                  <Col md={3}>
                    <small className="text-muted">Loan Amount</small>
                    <h6 className="fw-bold mt-1">₹{loanAmount || 0}</h6>
                  </Col>

                  <Col md={3}>
                    <small className="text-muted">Interest Rate</small>
                    <h6 className="fw-bold mt-1">{interestRate || 0}%</h6>
                  </Col>

                  <Col md={3}>
                    <small className="text-muted">Tenure</small>
                    <h6 className="fw-bold mt-1">{tenure || 0} Months</h6>
                  </Col>

                  <Col md={3}>
                    <small className="text-muted">Estimated EMI</small>
                    <h6 className="fw-bold text-success mt-1">
                      ₹{calculateEMI()}
                    </h6>
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

              <button type="button" className="btn add text-white px-4">
                Save Draft
              </button>

              <button type="submit" className="btn add text-white px-4">
                {selectedLoan ? "Update Loan" : "Submit Application"}
              </button>
            </div>

            <Modal
              show={showPreview}
              onHide={handleClose}
              centered
              dialogClassName="document-preview-modal"
            >
              <Modal.Header closeButton>
                <Modal.Title>Document Preview</Modal.Title>
              </Modal.Header>

              <Modal.Body className="text-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{
                    maxHeight: "400px",
                    objectFit: "contain",
                  }}
                />
              </Modal.Body>
            </Modal>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default LoanApplication;
