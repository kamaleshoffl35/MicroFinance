import { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createLoanType,
  fetchLoanTypes,
  updateLoanType,
  deleteLoanType,
} from "../../redux/loanTypeSlice";
import AppSnackbar from "../common/AppSnackbar";
import AgGridTable from "../common/AgGridTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDialog from "../common/ConfirmDialog";
function LoanTypes() {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [loanTypeName, setLoanTypeName] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoanTypeId, setDeleteLoanTypeId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [selectedLoanType, setSelectedLoanType] = useState(null);

  const { loanTypes } = useSelector((state) => state.loanType);

  useEffect(() => {
    dispatch(fetchLoanTypes());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!loanTypeName.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter Loan Type Name",
        severity: "warning",
      });
      return;
    }

    try {
      if (selectedLoanType) {
        await dispatch(
          updateLoanType({
            id: selectedLoanType._id,
            loanTypeName,
          }),
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Loan Type Updated Successfully",
          severity: "success",
        });
      } else {
        await dispatch(
          createLoanType({
            loanTypeName,
          }),
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Loan Type Added Successfully",
          severity: "success",
        });
      }

      dispatch(fetchLoanTypes());

      handleClose();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.message || "Something went wrong",
        severity: "error",
      });
    }
  };
  const columnDefs = [
    {
      headerName: "S.No",
      valueGetter: (params) => params.node.rowIndex + 1,
      width: 100,
    },
    {
      headerName: "Loan Type",
      field: "loanTypeName",
    },
  ];
  const actionRenderer = (params) => {
    return (
      <div className="d-flex gap-3 justify-content-center">
        <FaEdit
          style={{
            cursor: "pointer",
            color: "#198754",
          }}
          title="Edit"
          onClick={() => handleEdit(params.data)}
        />

        <FaTrash
          style={{
            cursor: "pointer",
            color: "#dc3545",
          }}
          title="Delete"
          onClick={() => handleDelete(params.data)}
        />
      </div>
    );
  };
  const handleEdit = (row) => {
    setSelectedLoanType(row);
    setLoanTypeName(row.loanTypeName);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setDeleteLoanTypeId(row._id);
    setShowDeleteDialog(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setLoanTypeName("");
    setSelectedLoanType(null);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(deleteLoanType(deleteLoanTypeId)).unwrap();

      dispatch(fetchLoanTypes());

      setSnackbar({
        open: true,
        message: "Loan Type Deleted Successfully",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.message || "Delete Failed",
        severity: "error",
      });
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
      setDeleteLoanTypeId(null);
    }
  };
  return (
    <>
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
      <Card className="shadow-sm border-0 rounded-4 mt-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">Loan Types</h4>
            <Button
              className="add"
              onClick={() => {
                setSelectedLoanType(null);
                setLoanTypeName("");
                setShowModal(true);
              }}
            >
              Add Loan Type
            </Button>
          </div>
        </Card.Body>
      </Card>
      <AgGridTable
        rowData={loanTypes}
        columnDefs={columnDefs}
        height="450px"
        showActions={true}
        actionRenderer={actionRenderer}
      />

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedLoanType ? "Edit Loan Type" : "Add Loan Type"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Loan Type Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Loan Type"
              value={loanTypeName}
              onChange={(e) => setLoanTypeName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button className="add" onClick={handleSubmit}>
            {selectedLoanType ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmDialog
        show={showDeleteDialog}
        onHide={() => {
          setShowDeleteDialog(false);
          setDeleteLoanTypeId(null);
        }}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Delete Loan Type"
        message="Are you sure you want to delete this loan type?"
        confirmText="Delete"
      />
    </>
  );
}

export default LoanTypes;
