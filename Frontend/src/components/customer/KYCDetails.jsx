import { Card, Row, Col, Form, Button, Badge } from "react-bootstrap";

import { FILE_BASE_URL } from "../../api/axiosInstance";
import { updateCustomer } from "../../redux/customerSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
function KYCDetails({ customer, onClose }) {
  const [remarks, setRemarks] = useState(customer?.remarks || "");

  if (!customer) {
    return <h5 className="text-center mt-5">Customer Not Found</h5>;
  }

  const dispatch = useDispatch();

  const handleApprove = async () => {
    await dispatch(
      updateCustomer({
        id: customer._id,
        formData: {
          ...customer,
          kycStatus: "Verified",
          remarks: "",
        },
      }),
    );

    onClose();
  };
  const handleReject = async () => {
    if (!remarks.trim()) {
      alert("Enter Remarks");
      return;
    }

    await dispatch(
      updateCustomer({
        id: customer._id,
        formData: {
          ...customer,
          kycStatus: "Rejected",
          remarks,
        },
      }),
    );

    onClose();
  };

  return (
    <div className="container-fluid py-4">
      <h3 className="fw-bold mb-4">KYC Verification</h3>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <h6>
                <b>Customer ID :</b> {customer.customerId}
              </h6>
            </Col>

            <Col md={6}>
              <h6>
                <b>KYC Status :</b>{" "}
                <Badge bg="warning" text="dark">
                  {customer.kycStatus}
                </Badge>
              </h6>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="fw-bold">Customer Details</Card.Header>

            <Card.Body>
              <p>
                <b>Name :</b> {customer.customerName}
              </p>

              <p>
                <b>Phone :</b> {customer.mobileNumber}
              </p>

              <p>
                <b>DOB :</b> {customer.dateOfBirth?.substring(0, 10)}
              </p>

              <p>
                <b>Gender :</b> {customer.gender}
              </p>

              <p>
                <b>Branch :</b> {customer.branch}
              </p>

              <p className="mb-1">
                <b>Address :</b>
              </p>

              <div className="border rounded p-3 bg-light">
                {customer.address?.doorNumber}, {customer.address?.street}
                <br />
                {customer.address?.village}
                <br />
                {customer.address?.city}, {customer.address?.district}
                <br />
                {customer.address?.state} - {customer.address?.pinCode}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="fw-bold">Documents</Card.Header>

            <Card.Body className="d-grid gap-3">
              <a
                className="btn docs btn-sm"
                href={`${FILE_BASE_URL}${customer.documents?.aadhaarFront}`}
                target="_blank"
                rel="noreferrer"
              >
                Aadhaar Front
              </a>

              <a
                className="btn docs btn-sm"
                href={`${FILE_BASE_URL}${customer.documents?.aadhaarBack}`}
                target="_blank"
                rel="noreferrer"
              >
                Aadhaar Back
              </a>

              <a
                className="btn docs btn-sm"
                href={`${FILE_BASE_URL}${customer.documents?.panCard}`}
                target="_blank"
                rel="noreferrer"
              >
                PAN Card
              </a>

              <a
                className="btn docs btn-sm"
                href={`${FILE_BASE_URL}${customer.documents?.passportPhoto}`}
                target="_blank"
                rel="noreferrer"
              >
                Passport Photo
              </a>

              <a
                className="btn docs btn-sm"
                href={`${FILE_BASE_URL}${customer.documents?.signature}`}
                target="_blank"
                rel="noreferrer"
              >
                Signature
              </a>

              <a
                className="btn docs btn-sm"
                href={`${FILE_BASE_URL}${customer.documents?.addressProof}`}
                target="_blank"
                rel="noreferrer"
              >
                Address Proof
              </a>

              <a
                className="btn docs btn-sm "
                href={`${FILE_BASE_URL}${customer.documents?.incomeProof}`}
                target="_blank"
                rel="noreferrer"
              >
                Income Proof
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm mt-4">
        <Card.Body>
          <Form.Group>
            <Form.Label className="fw-bold">Remarks</Form.Label>

            <Form.Control
              as="textarea"
              rows={5}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks..."
            />
          </Form.Group>

          <div className="text-center mt-4">
            <Button className="me-3 px-4 add" onClick={handleApprove}>
              Approve
            </Button>

            <Button className="px-4 add" onClick={handleReject}>
              Reject
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default KYCDetails;
