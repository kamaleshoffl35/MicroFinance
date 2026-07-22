import Form from "react-bootstrap/Form";

function CustomerKycFilter() {
  return (
    <Form.Select>

      <option>KYC: Any Status</option>

      <option>Verified</option>

      <option>Pending</option>

      <option>Rejected</option>

    </Form.Select>
  );
}

export default CustomerKycFilter;