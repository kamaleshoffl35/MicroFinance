import Form from "react-bootstrap/Form";

function LoanStatusFilter() {
  return (
    <Form.Select>
      <option>All Status</option>

      <option>Applied</option>

      <option>Awaiting Approval</option>

      <option>Approved</option>

      <option>Rejected</option>

      <option>Disbursed</option>

      <option>Closed</option>
    </Form.Select>
  );
}

export default LoanStatusFilter;
