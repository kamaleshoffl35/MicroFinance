import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { State, City } from "country-state-city";
import {
  addCustomer,
  updateCustomer,
  fetchCustomers,
} from "../../redux/customerSlice";
import CustomerBranchFilter from "../customer/CustomerBranchFilter";
import AppSnackbar from "../../components/common/AppSnackbar";
import { useParams, useNavigate } from "react-router-dom";
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
  // { key: "addressProof", label: "Address Proof" },
  { key: "incomeProof", label: "Income Proof" },
];
const getFileName = (file) => {
  if (!file) return "";

  if (typeof file === "string") {
    return file.split("/").pop();
  }

  return file.name;
};
function CustomerRegistration({ editData, onClose }) {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customers } = useSelector((state) => state.customer);

  const isEdit = !!editData;
  const isRejected = editData?.kycStatus === "Rejected";
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const indianStates = State.getStatesOfCountry("IN");
  const selectedState = indianStates.find(
    (state) => state.name === formData.address.state,
  );

  const cities = selectedState
    ? City.getCitiesOfState("IN", selectedState.isoCode)
    : [];
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        dateOfBirth: editData.dateOfBirth
          ? editData.dateOfBirth.substring(0, 10)
          : "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    const nameOnlyFields = [
      "customerName",
      "fatherName",
      "occupation",
      "branch",
      "bank.bankName",
      "bank.branchName",
      "nominee.name",
      "nominee.relation",
    ];

    if (nameOnlyFields.includes(name)) {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    const numberOnlyFields = {
      mobileNumber: 10,
      monthlyIncome: null,
      "address.pinCode": 6,
      "bank.accountNumber": null,
      "nominee.age": 3,
      "nominee.phoneNumber": 10,
    };

    if (numberOnlyFields[name] !== undefined) {
      updatedValue = value.replace(/\D/g, "");
      if (numberOnlyFields[name]) {
        updatedValue = updatedValue.slice(0, numberOnlyFields[name]);
      }
    }

    if (name === "email") {
      updatedValue = value.replace(/[^a-zA-Z0-9@._%+-]/g, "");
    }
    if (name === "address.state") {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          state: updatedValue,
          city: "",
        },
      }));

      return;
    }
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: updatedValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: updatedValue,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
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
    if (!formData.customerName.trim())
      newErrors.customerName = "Customer name is required";

    if (!formData.fatherName.trim())
      newErrors.fatherName = "Father name is required";

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\+?\d{10,13}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.occupation.trim())
      newErrors.occupation = "Occupation is required";

    if (!formData.branch.trim()) newErrors.branch = "Branch is required";

    if (!formData.address.doorNumber.trim())
      newErrors["address.doorNumber"] = "Door number is required";

    if (!formData.address.street.trim())
      newErrors["address.street"] = "Street is required";

    if (!formData.address.city.trim())
      newErrors["address.city"] = "City is required";

    if (!formData.address.district.trim())
      newErrors["address.district"] = "District is required";

    if (!formData.address.state.trim())
      newErrors["address.state"] = "State is required";

    if (!formData.address.pinCode.trim()) {
      newErrors["address.pinCode"] = "PIN Code is required";
    } else if (!/^\d{6}$/.test(formData.address.pinCode.trim())) {
      newErrors["address.pinCode"] = "PIN Code must be 6 digits";
    }

    if (!formData.identity.aadhaarNumber.trim()) {
      newErrors["identity.aadhaarNumber"] = "Aadhaar number is required";
    } else if (!/^\d{12}$/.test(formData.identity.aadhaarNumber.trim())) {
      newErrors["identity.aadhaarNumber"] = "Aadhaar number must be 12 digits";
    }

    if (!formData.identity.panNumber.trim()) {
      newErrors["identity.panNumber"] = "PAN number is required";
    } else if (
      !/^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(formData.identity.panNumber.trim())
    ) {
      newErrors["identity.panNumber"] = "Enter a valid PAN number";
    }

    if (!formData.identity.drivingLicense.trim())
      newErrors["identity.drivingLicense"] = "Driving License is required";

    if (!formData.identity.voterId.trim())
      newErrors["identity.voterId"] = "Voter ID is required";

    if (!formData.bank.bankName.trim())
      newErrors["bank.bankName"] = "Bank name is required";

    if (!formData.bank.accountNumber.trim())
      newErrors["bank.accountNumber"] = "Account number is required";

    if (!formData.bank.ifscCode.trim())
      newErrors["bank.ifscCode"] = "IFSC code is required";

    if (!formData.bank.branchName.trim())
      newErrors["bank.branchName"] = "Branch name is required";

    if (!formData.nominee.name.trim())
      newErrors["nominee.name"] = "Nominee name is required";

    if (!formData.nominee.relation.trim())
      newErrors["nominee.relation"] = "Relation is required";

    if (!formData.nominee.age) newErrors["nominee.age"] = "Age is required";

    if (!formData.nominee.phoneNumber.trim())
      newErrors["nominee.phoneNumber"] = "Phone number is required";

    if (!isEdit) {
      DOCUMENT_FIELDS.forEach(({ key, label }) => {
        if (!formData.documents[key]) {
          newErrors[`documents.${key}`] = `${label} is required`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => setFormData(initialState);

  const submitForm = async (status) => {
    setAlertMessage(null);

    if (status !== "Draft" && !validate()) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields.",
        severity: "warning",
      });
      return;
    }

    setSubmitting(true);
    try {
      await dispatch(addCustomer({ ...formData, status })).unwrap();
      setSnackbar({
        open: true,
        message:
          status === "Draft"
            ? "Draft saved successfully."
            : "Customer registered successfully.",
        severity: "success",
      });
      resetForm();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields.",
        severity: "warning",
      });
      return;
    }

    setSubmitting(true);

    try {
      if (isEdit) {
        await dispatch(
          updateCustomer({
            id: editData._id,
            formData: {
              ...formData,
              kycStatus: "Pending",
              remarks: "",
            },
          }),
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Customer updated successfully.",
          severity: "success",
        });
        onClose?.();
      } else {
        await dispatch(
          addCustomer({
            ...formData,
            status: "Active",
          }),
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Customer registered successfully.",
          severity: "success",
        });

        resetForm();
        setErrors({});
      }

      setTimeout(() => {
        navigate("/customer");
      }, 1500);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.message || "Something went wrong.",
        severity: "error",
      });

      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  const handleSaveDraft = () => {
    submitForm("Draft");
  };

  const handleCancel = () => {
    resetForm();
    setErrors({});
    setAlertMessage(null);
  };

  return (
    <Container fluid className="mt-4">
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

      <Form onSubmit={handleSubmit} noValidate>
        <Row>
          {isRejected && (
            <Alert variant="danger" className="mb-4">
              <Alert.Heading>KYC Rejected</Alert.Heading>

              <p className="mb-0">
                <strong>Reason:</strong>
                <br />
                {editData.remarks}
              </p>
            </Alert>
          )}

          <Col lg={6}>
            <Card className=" form-card shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Personal Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Customer Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="customerName"
                      className="rounded-3"
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
                    <Form.Label>
                      Father Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="fatherName"
                      className="rounded-3"
                      placeholder="Enter Father Name"
                      value={formData.fatherName}
                      onChange={handleChange}
                      isInvalid={!!errors.fatherName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fatherName}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Date of Birth <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      className="rounded-3"
                      className="rounded-3"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      isInvalid={!!errors.dateOfBirth}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dateOfBirth}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Gender <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      name="gender"
                      className="rounded-3"
                      value={formData.gender}
                      onChange={handleChange}
                      isInvalid={!!errors.gender}
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Mobile Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="mobileNumber"
                      className="rounded-3"
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
                    <Form.Label>
                      Email <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      className="rounded-3"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Occupation <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="occupation"
                      placeholder="Occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      isInvalid={!!errors.occupation}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.occupation}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Monthly Income</Form.Label>
                    <Form.Control
                      type="number"
                      className="rounded-3"
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
                      className="rounded-3"
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
                    <Form.Label>
                      Branch <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="branch"
                      placeholder="Branch Name"
                      value={formData.branch}
                      onChange={handleChange}
                      isInvalid={!!errors.branch}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.branch}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="form-card shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">
                  Address Details <span className="text-danger">*</span>
                </h5>

                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label>
                      Door Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="address.doorNumber"
                      placeholder="Door No"
                      value={formData.address.doorNumber}
                      onChange={handleChange}
                      isInvalid={!!errors["address.doorNumber"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["address.doorNumber"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={8} className="mb-3">
                    <Form.Label>
                      Street <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="address.street"
                      placeholder="Street Name"
                      value={formData.address.street}
                      onChange={handleChange}
                      isInvalid={!!errors["address.street"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["address.street"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Village</Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="address.village"
                      placeholder="Village"
                      value={formData.address.village}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>
                      State <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Select
                      name="address.state"
                      className="rounded-3"
                      value={formData.address.state}
                      onChange={handleChange}
                      isInvalid={!!errors["address.state"]}
                    >
                      <option value="">Select State</option>

                      {indianStates.map((state) => (
                        <option key={state.isoCode} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                      {errors["address.state"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label>
                      City <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Select
                      className="rounded-3"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                      isInvalid={!!errors["address.city"]}
                      disabled={!formData.address.state}
                    >
                      <option value="">Select City</option>

                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </Form.Select>

                    <Form.Control.Feedback type="invalid">
                      {errors["address.city"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label>
                      District <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      name="address.district"
                      className="rounded-3"
                      placeholder="District"
                      value={formData.address.district}
                      onChange={handleChange}
                      isInvalid={!!errors["address.district"]}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors["address.district"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={4} className="mb-3">
                    <Form.Label>
                      PIN Code <span className="text-danger">*</span>
                    </Form.Label>

                    <Form.Control
                      name="address.pinCode"
                      className="rounded-3"
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

            <Card className="form-card shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Identity Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Aadhaar Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
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
                    <Form.Label>
                      PAN Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
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
                    <Form.Label>
                      Driving License <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="identity.drivingLicense"
                      placeholder="DL Number"
                      value={formData.identity.drivingLicense}
                      onChange={handleChange}
                      isInvalid={!!errors["identity.drivingLicense"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["identity.drivingLicense"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Voter ID <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="identity.voterId"
                      placeholder="Voter ID"
                      value={formData.identity.voterId}
                      onChange={handleChange}
                      isInvalid={!!errors["identity.voterId"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["identity.voterId"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="form-card shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Bank Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Bank Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="bank.bankName"
                      placeholder="Bank Name"
                      value={formData.bank.bankName}
                      onChange={handleChange}
                      isInvalid={!!errors["bank.bankName"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["bank.bankName"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Account Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="bank.accountNumber"
                      placeholder="Account Number"
                      value={formData.bank.accountNumber}
                      onChange={handleChange}
                      isInvalid={!!errors["bank.accountNumber"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["bank.accountNumber"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      IFSC Code <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="bank.ifscCode"
                      placeholder="IFSC Code"
                      value={formData.bank.ifscCode}
                      onChange={handleChange}
                      isInvalid={!!errors["bank.ifscCode"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["bank.ifscCode"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Branch Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="bank.branchName"
                      placeholder="Branch Name"
                      value={formData.bank.branchName}
                      onChange={handleChange}
                      isInvalid={!!errors["bank.branchName"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["bank.branchName"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="form-card shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Nominee Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Nominee Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="nominee.name"
                      placeholder="Nominee Name"
                      value={formData.nominee.name}
                      onChange={handleChange}
                      isInvalid={!!errors["nominee.name"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["nominee.name"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Relation <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="nominee.relation"
                      placeholder="Relation"
                      value={formData.nominee.relation}
                      onChange={handleChange}
                      isInvalid={!!errors["nominee.relation"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["nominee.relation"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Age <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      type="number"
                      min="0"
                      name="nominee.age"
                      placeholder="Age"
                      value={formData.nominee.age}
                      onChange={handleChange}
                      isInvalid={!!errors["nominee.age"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["nominee.age"]}
                    </Form.Control.Feedback>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>
                      Phone Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="nominee.phoneNumber"
                      placeholder="+91 xxxxxxxxxx"
                      value={formData.nominee.phoneNumber}
                      onChange={handleChange}
                      isInvalid={!!errors["nominee.phoneNumber"]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors["nominee.phoneNumber"]}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="form-card shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Guarantor Details</h5>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Guarantor Name</Form.Label>
                    <Form.Control
                      className="rounded-3"
                      name="guarantor.name"
                      placeholder="Guarantor Name"
                      value={formData.guarantor.name}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      className="rounded-3"
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
                      className="rounded-3"
                      name="guarantor.occupation"
                      placeholder="Occupation"
                      value={formData.guarantor.occupation}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Monthly Income</Form.Label>
                    <Form.Control
                      className="rounded-3"
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
                      className="rounded-3"
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

            <Card className="form-card shadow-sm border-0 rounded-4 mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Documents Upload</h5>

                <Row className="g-3">
                  {DOCUMENT_FIELDS.map(({ key, label }) => (
                    <Col md={6} key={key}>
                      <div className="border rounded-3 p-4 text-center bg-light">
                        <h6>
                          {label} <span className="text-danger">*</span>
                        </h6>
                        <Form.Control
                          className="rounded-3"
                          type="file"
                          name={key}
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileChange}
                        />

                        {formData.documents[key] && (
                          <div className="small mt-2 text-success text-truncate">
                            Selected:
                            <br />
                            {getFileName(formData.documents[key])}
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
            className="btn add px-4 text-white"
            onClick={handleSaveDraft}
            disabled={submitting}
          >
            {submitting ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Save Draft"
            )}
          </button>

          <button
            type="submit"
            className="btn add text-white px-4"
            disabled={submitting}
          >
            {submitting ? (
              <Spinner animation="border" size="sm" />
            ) : isEdit ? (
              "Update Customer"
            ) : (
              "Register Customer"
            )}
          </button>
        </div>
      </Form>
    </Container>
  );
}

export default CustomerRegistration;
