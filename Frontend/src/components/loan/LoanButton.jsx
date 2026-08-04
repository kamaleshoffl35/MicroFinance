import Button from "react-bootstrap/Button";

function LoanButton({ setShowModal, setSelectedLoan }) {
  return (
    <Button
    variant=""
      className="add shadow-none text-white"
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
