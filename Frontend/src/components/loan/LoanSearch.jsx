import Form from "react-bootstrap/Form";

function LoanSearch({ search, setSearch }) {
  return (
    <Form.Control
      type="text"
      placeholder="Search Loan ID or Customer..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default LoanSearch;
