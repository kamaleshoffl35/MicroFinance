import Form from "react-bootstrap/Form";

function CustomerBranchFilter() {
  return (
    <Form.Select>

      <option>All Branches</option>

      <option>Chennai</option>

      <option>Madurai</option>

      <option>Trichy</option>

    </Form.Select>
  );
}

export default CustomerBranchFilter;