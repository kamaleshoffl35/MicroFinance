import { useState, useEffect } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createTenure,
  fetchTenures,
  updateTenure,
  deleteTenure,
} from "../../redux/tenureSlice";

import AppSnackbar from "../common/AppSnackbar";
import AgGridTable from "../common/AgGridTable";
import ConfirmDialog from "../common/ConfirmDialog";

import { FaEdit, FaTrash } from "react-icons/fa";

function Tenure() {
  const dispatch = useDispatch();

  const { tenures } = useSelector((state) => state.tenure);

  const [showModal, setShowModal] = useState(false);
  const [tenureName, setTenureName] = useState("");

  const [selectedTenure, setSelectedTenure] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [deleteTenureId, setDeleteTenureId] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    dispatch(fetchTenures());
  }, [dispatch]);

  const handleClose = () => {
    setShowModal(false);
    setSelectedTenure(null);
    setTenureName("");
  };

  const handleSubmit = async () => {
    if (!tenureName.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter Tenure",
        severity: "warning",
      });
      return;
    }

    try {
      if (selectedTenure) {
        await dispatch(
          updateTenure({
            id: selectedTenure._id,
            tenureName,
          }),
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Tenure Updated Successfully",
          severity: "success",
        });
      } else {
        await dispatch(
          createTenure({
            tenureName,
          }),
        ).unwrap();

        setSnackbar({
          open: true,
          message: "Tenure Added Successfully",
          severity: "success",
        });
      }

      dispatch(fetchTenures());

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
    setSelectedTenure(row);
    setTenureName(row.tenureName);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setDeleteTenureId(row._id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(deleteTenure(deleteTenureId)).unwrap();

      dispatch(fetchTenures());

      setSnackbar({
        open: true,
        message: "Tenure Deleted Successfully",
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
      setDeleteTenureId(null);
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
      headerName: "Tenure",
      field: "tenureName",
      flex: 1,
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
            <h4 className="mb-0">Tenure</h4>

            <Button
              className="add"
              onClick={() => {
                setSelectedTenure(null);
                setTenureName("");
                setShowModal(true);
              }}
            >
              Add Tenure
            </Button>
          </div>
        </Card.Body>
      </Card>

      <AgGridTable
        rowData={tenures}
        columnDefs={columnDefs}
        height="450px"
        showActions={true}
        actionRenderer={actionRenderer}
      />

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTenure ? "Edit Tenure" : "Add Tenure"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Tenure</Form.Label>

            <Form.Control
              type="text"
              placeholder="Ex : 3 Months"
              value={tenureName}
              onChange={(e) => setTenureName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button className="add" onClick={handleSubmit}>
            {selectedTenure ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmDialog
        show={showDeleteDialog}
        onHide={() => {
          setShowDeleteDialog(false);
          setDeleteTenureId(null);
        }}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        title="Delete Tenure"
        message="Are you sure you want to delete this tenure?"
        confirmText="Delete"
      />
    </>
  );
}

export default Tenure;
