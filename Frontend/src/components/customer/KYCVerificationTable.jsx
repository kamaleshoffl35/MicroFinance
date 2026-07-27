import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import AgGridTable from "../common/AgGridTable";
import { fetchCustomers } from "../../redux/customerSlice";

function KYCVerificationTable({ setShowKYCModal, setSelectedKYC }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customers, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    if (customers.length === 0) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customers.length]);

  const pendingCustomers = customers.filter(
    (customer) => customer.kycStatus === "Pending",
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );

      case "Verified":
        return <Badge bg="success">Verified</Badge>;

      case "Rejected":
        return <Badge bg="danger">Rejected</Badge>;

      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const columnDefs = [
    {
      headerName: "Customer ID",
      field: "customerId",
      flex: 1,
    },
    {
      headerName: "Name",
      field: "customerName",
      flex: 1.5,
    },
    {
      headerName: "Aadhaar",
      valueGetter: (params) =>
        params.data.identity?.aadhaarNumber ? "✓" : "✗",
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "PAN",
      valueGetter: (params) => (params.data.identity?.panNumber ? "✓" : "✗"),
      cellStyle: { textAlign: "center" },
    },
    {
      headerName: "Status",
      field: "kycStatus",
      cellRenderer: (params) => getStatusBadge(params.value),
      flex: 1,
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AgGridTable
      rowData={pendingCustomers}
      columnDefs={columnDefs}
      showActions={true}
      actionRenderer={(params) => (
        <button
          className="verify btn-sm"
          onClick={() => {
            setSelectedKYC(params.data);
            setShowKYCModal(true);
          }}
        >
          Verify
        </button>
      )}
    />
  );
}

export default KYCVerificationTable;
