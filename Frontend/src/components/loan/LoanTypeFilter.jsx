import Form from "react-bootstrap/Form";

function LoanTypeFilter() {
  return (
    <Form.Select>
      <option>All Loan Types</option>

      <option>Personal</option>

      <option>Business</option>

      <option>Gold</option>

      <option>Vehicle</option>

      <option>Group</option>
    </Form.Select>
  );
}

export default LoanTypeFilter;
