import Form from "react-bootstrap/Form";

function CustomerSearch({ search, setSearch }) {
  return (
    <Form.Control
      type="text"
      placeholder="Search by name, phone or customer ID..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default CustomerSearch;