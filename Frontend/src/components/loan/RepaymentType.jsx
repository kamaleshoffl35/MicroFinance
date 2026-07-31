import { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createRepaymentType,
  fetchRepaymentTypes,
  updateRepaymentType,
  deleteRepaymentType,
} from "../../redux/repaymentTypeSlice";

import AppSnackbar from "../common/AppSnackbar";
import AgGridTable from "../common/AgGridTable";
import ConfirmDialog from "../common/ConfirmDialog";

import { FaEdit, FaTrash } from "react-icons/fa";

function RepaymentType() {
  const dispatch = useDispatch();

  const { repaymentTypes } = useSelector(
    (state) => state.repaymentType
  );

  const [showModal, setShowModal] = useState(false);
  const [repaymentTypeName, setRepaymentTypeName] = useState("");

  const [selectedRepaymentType, setSelectedRepaymentType] =
    useState(null);

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchRepaymentTypes());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setSelectedRepaymentType(null);
    setRepaymentTypeName("");
  };

  const handleSubmit = async () => {
    if (!repaymentTypeName.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter Repayment Type",
        severity: "warning",
      });
      return;
    }

    try {
      if (selectedRepaymentType) {
        await dispatch(
          updateRepaymentType({
            id: selectedRepaymentType._id,
            repaymentTypeName,
          })
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Repayment Type Updated Successfully",
          severity: "success",
        });
      } else {
        await dispatch(
          createRepaymentType({
            repaymentTypeName,
          })
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Repayment Type Added Successfully",
          severity: "success",
        });
      }

      dispatch(fetchRepaymentTypes());

      handleClose();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err?.message || "Something went wrong",
        severity: "error",
      });
    }
  };

  const handleEdit = (row) => {
    setSelectedRepaymentType(row);
    setRepaymentTypeName(row.repaymentTypeName);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setDeleteId(row._id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(deleteRepaymentType(deleteId)).unwrap();

      dispatch(fetchRepaymentTypes());

      setSnackbar({
        open: true,
        message: "Repayment Type Deleted Successfully",
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
      setDeleteId(null);
      setShowDeleteDialog(false);
    }
  };

  const columnDefs = [
    {
      headerName: "S.No",
      valueGetter: (params) => params.node.rowIndex + 1,
      width: 100,
    },
    {
      headerName: "Repayment Type",
      field: "repaymentTypeName",
      flex: 1,
    },
  ];

  const actionRenderer = (params) => (
    <div className="d-flex gap-3 justify-content-center">
      <FaEdit
        style={{ cursor: "pointer", color: "#198754" }}
        onClick={() => handleEdit(params.data)}
      />

      <FaTrash
        style={{ cursor: "pointer", color: "#dc3545" }}
        onClick={() => handleDelete(params.data)}
      />
    </div>
  );

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
            <h4 className="mb-0">
              Repayment Types
            </h4>

            <Button
              className="add"
              onClick={() => {
                setSelectedRepaymentType(null);
                setRepaymentTypeName("");
                setShowModal(true);
              }}
            >
              Add Repayment Type
            </Button>
          </div>
        </Card.Body>
      </Card>

      <AgGridTable
        rowData={repaymentTypes}
        columnDefs={columnDefs}
        height="450px"
        showActions={true}
        actionRenderer={actionRenderer}
      />

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedRepaymentType
              ? "Edit Repayment Type"
              : "Add Repayment Type"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>
              Repayment Type
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Ex : Monthly EMI"
              value={repaymentTypeName}
              onChange={(e) =>
                setRepaymentTypeName(e.target.value)
              }
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            className="add"
            onClick={handleSubmit}
          >
            {selectedRepaymentType
              ? "Update"
              : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmDialog
        show={showDeleteDialog}
        onHide={() => {
          setShowDeleteDialog(false);
          setDeleteId(null);
        }}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Delete Repayment Type"
        message="Are you sure you want to delete this repayment type?"
        confirmText="Delete"
      />
    </>
  );
}

export default RepaymentType;