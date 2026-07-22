import Form from "react-bootstrap/Form";

function CustomerSearch() {
  return (
    <Form.Control
      type="text"
      placeholder="Search by name, phone or customer ID..."
    />
  );
}

export default CustomerSearch;