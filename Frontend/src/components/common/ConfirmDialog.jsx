import { Modal, Button } from "react-bootstrap";

function ConfirmDialog({
  show,
  onHide,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this record?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="mb-0">{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
     variant="outline-secondary"
          onClick={onHide}
          disabled={loading}
        >
          {cancelText}
        </Button>

        <Button
         className="add"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Deleting..." : confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDialog;