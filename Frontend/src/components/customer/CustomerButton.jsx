import Button from "react-bootstrap/Button";

function CustomerButton({ setActiveTab }) {
  return (
    <Button
      className="w-100"
      variant="warning"
      onClick={() => setActiveTab("registration")}
    >
      + New Customer
    </Button>
  );
}

export default CustomerButton;