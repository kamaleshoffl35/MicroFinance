import Button from "react-bootstrap/Button";

function LoanButton({ setShowModal, setSelectedLoan }) {
  return (
    <Button
      className="add shadow-none"
      onClick={() => {
        setSelectedLoan(null);
        setShowModal(true);
      }}
    >
      New Loan
    </Button>
  );
}

export default LoanButton;
