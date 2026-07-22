import { useState } from "react";
import { Container, Row, Col, Card, Form, Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../redux/customerSlice";

const initialState = {
  customerName: "",
  fatherName: "",
  dateOfBirth: "",
  gender: "",
  mobileNumber: "",
  email: "",
  occupation: "",
  monthlyIncome: "",
  maritalStatus: "",
  branch: "",
  address: {
    doorNumber: "",
    street: "",
    village: "",
    city: "",
    district: "",
    state: "",
    pinCode: "",
  },
  identity: {
    aadhaarNumber: "",
    panNumber: "",
    drivingLicense: "",
    voterId: "",
  },
  bank: {
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchName: "",
  },
  nominee: {
    name: "",
    relation: "",
    age: "",
    phoneNumber: "",
  },
  guarantor: {
    name: "",
    phoneNumber: "",
    occupation: "",
    monthlyIncome: "",
    address: "",
  },
  documents: {
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    passportPhoto: null,
    signature: null,
    addressProof: null,
    incomeProof: null,
  },
};

const DOCUMENT_FIELDS = [
  { key: "aadhaarFront", label: "Aadhaar Front" },
  { key: "aadhaarBack", label: "Aadhaar Back" },
  { key: "panCard", label: "PAN Card" },
  { key: "passportPhoto", label: "Passport Photo" },
  { key: "signature", label: "Signature" },
  { key: "addressProof", label: "Address Proof" },
  { key: "incomeProof", label: "Income Proof" },
];

function CustomerRegistration() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null); // { variant: 'success' | 'danger', message: string }

  // Handles both flat fields (e.g. "customerName") and nested fields
  // (e.g. "address.city") using dot-notation in the `name` attribute.
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [name]: files[0] || null },
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\+?\d{10,13}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid mobile number";
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (
      formData.identity.aadhaarNumber &&
      !/^\d{12}$/.test(formData.identity.aadhaarNumber.trim())
    ) {
      newErrors["identity.aadhaarNumber"] = "Aadhaar number must be 12 digits";
    }

    if (
      formData.identity.panNumber &&
      !/^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(formData.identity.panNumber.trim())
    ) {
      newErrors["identity.panNumber"] = "Enter a valid PAN number (e.g. ABCDE1234F)";
    }

    if (formData.address.pinCode && !/^\d{6}$/.test(formData.address.pinCode.trim())) {
      newErrors["address.pinCode"] = "PIN code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => setFormData(initialState);

  const submitForm = async (status) => {
    setAlert(null);

    if (status !== "Draft" && !validate()) {
      setAlert({ variant: "danger", message: "Please fix the highlighted errors before submitting." });
      return;
    }

    setSubmitting(true);
    try {
     await dispatch(addCustomer({ ...formData, status })).unwrap();
      setAlert({
        variant: "success",
        message:
          status === "Draft"
            ? "Draft saved successfully."
            : "Customer registered successfully!",
      });
      resetForm();
    } catch (error) {
      setAlert({ variant: "danger", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm("Active");
  };

  const handleSaveDraft = () => {
    submitForm("Draft");
  };

  const handleCancel = () => {
    resetForm();
    setErrors({});
    setAlert(null);
  };

  return (
    <Container fluid className="mt-4">
      {alert && (
        <Alert variant={alert.variant} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          {/* Left Column */}
          <Col lg={6}>
            {/* Personal Details */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Personal Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      name="customerName"
                      placeholder="Enter Customer Name"
                      value={formData.customerName}
                      onChange={handleChange}
                      isInvalid={!!errors.customerName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.customerName}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Father Name</Form.Label>
                    <Form.Control
                      name="fatherName"
                      placeholder="Enter Father Name"
                      value={formData.fatherName}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      name="mobileNumber"
                      placeholder="+91 xxxxxxxxxx"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.mobileNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.mobileNumber}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                      name="occupation"
                      placeholder="Occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Monthly Income</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      name="monthlyIncome"
                      placeholder="Monthly Income"
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Label>Marital Status</Form.Label>
                    <Form.Select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                    </Form.Select>
                  </Col>

                  <Col md={6}>
                    <Form.Label>Branch</Form.Label>
                    <Form.Control
                      name="branch"
                      placeholder="Branch Name"
                      value={formData.branch}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Address Details */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Address Details</h5>

                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label>Door Number</Form.Label>
                    <Form.Control
                      name="address.doorNumber"
                      placeholder="Door No"
                      value={formData.address.doorNumber}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={8} className="mb-3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      name="address.street"
                      placeholder="Street Name"
                      value={formData.address.street}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Village</Form.Label>
                    <Form.Control
                      name="address.village"
                      placeholder="Village"
                      value={formData.address.village}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name="address.city"
                      placeholder="City"
                      value={formData.address.city}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      name="address.district"
                      placeholder="District"
                      value={formData.address.district}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={3} className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      name="address.state"
                      placeholder="State"
                      value={formData.address.state}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={3} className="mb-3">
                    <Form.Label>PIN Code</Form.Label>
                    <Form.Control
                      name="address.pinCode"
                      placeholder="PIN Code"
                      value={formData.address.pinCode}
                      onChange={handleChange}
                      isInvalid={!!errors["address.pinCode"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["address.pinCode"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Identity Details */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Identity Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Aadhaar Number</Form.Label>
                    <Form.Control
                      name="identity.aadhaarNumber"
                      placeholder="XXXX XXXX XXXX"
                      value={formData.identity.aadhaarNumber}
                      onChange={handleChange}
                      isInvalid={!!errors["identity.aadhaarNumber"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["identity.aadhaarNumber"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>PAN Number</Form.Label>
                    <Form.Control
                      name="identity.panNumber"
                      placeholder="ABCDE1234F"
                      value={formData.identity.panNumber}
                      onChange={handleChange}
                      isInvalid={!!errors["identity.panNumber"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["identity.panNumber"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Driving License</Form.Label>
                    <Form.Control
                      name="identity.drivingLicense"
                      placeholder="DL Number"
                      value={formData.identity.drivingLicense}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Voter ID</Form.Label>
                    <Form.Control
                      name="identity.voterId"
                      placeholder="Voter ID"
                      value={formData.identity.voterId}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Bank Details */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Bank Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control
                      name="bank.bankName"
                      placeholder="Bank Name"
                      value={formData.bank.bankName}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control
                      name="bank.accountNumber"
                      placeholder="Account Number"
                      value={formData.bank.accountNumber}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>IFSC Code</Form.Label>
                    <Form.Control
                      name="bank.ifscCode"
                      placeholder="IFSC Code"
                      value={formData.bank.ifscCode}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control
                      name="bank.branchName"
                      placeholder="Branch Name"
                      value={formData.bank.branchName}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column */}
          <Col lg={6}>
            {/* Nominee Details */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Nominee Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Nominee Name</Form.Label>
                    <Form.Control
                      name="nominee.name"
                      placeholder="Nominee Name"
                      value={formData.nominee.name}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Relation</Form.Label>
                    <Form.Control
                      name="nominee.relation"
                      placeholder="Relation"
                      value={formData.nominee.relation}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      name="nominee.age"
                      placeholder="Age"
                      value={formData.nominee.age}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="nominee.phoneNumber"
                      placeholder="+91 xxxxxxxxxx"
                      value={formData.nominee.phoneNumber}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Guarantor Details */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Guarantor Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Guarantor Name</Form.Label>
                    <Form.Control
                      name="guarantor.name"
                      placeholder="Guarantor Name"
                      value={formData.guarantor.name}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      name="guarantor.phoneNumber"
                      placeholder="+91 xxxxxxxxxx"
                      value={formData.guarantor.phoneNumber}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control
                      name="guarantor.occupation"
                      placeholder="Occupation"
                      value={formData.guarantor.occupation}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Monthly Income</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      name="guarantor.monthlyIncome"
                      placeholder="Monthly Income"
                      value={formData.guarantor.monthlyIncome}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="guarantor.address"
                      placeholder="Guarantor Address"
                      value={formData.guarantor.address}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Documents Upload */}
            <Card className="shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Documents Upload</h5>

                <Row className="g-3">
                  {DOCUMENT_FIELDS.map(({ key, label }) => (
                    <Col md={6} key={key}>
                      <div className="border rounded-3 p-4 text-center bg-light">
                        <h6>{label}</h6>
                        <Form.Control
                          type="file"
                          name={key}
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileChange}
                        />
                        {formData.documents[key] && (
                          <div className="small text-muted mt-1 text-truncate">
                            {formData.documents[key].name}
                          </div>
                        )}
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-3 mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary px-4"
            onClick={handleCancel}
            disabled={submitting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-warning px-4 text-white"
            onClick={handleSaveDraft}
            disabled={submitting}
          >
            {submitting ? <Spinner animation="border" size="sm" /> : "Save Draft"}
          </button>

          <button type="submit" className="btn btn-success px-4" disabled={submitting}>
            {submitting ? <Spinner animation="border" size="sm" /> : "Register Customer"}
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default CustomerRegistration;
