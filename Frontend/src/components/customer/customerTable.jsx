import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AgGridTable from "../common/AgGridTable";
import { fetchCustomers } from "../../redux/customerSlice";

function CustomerTable() {
  const dispatch = useDispatch();

  const { customers, loading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const columnDefs = [
    {
      headerName: "Customer ID",
      field: "customerId",
    },
    {
      headerName: "Name",
      field: "customerName",
    },
    {
      headerName: "Phone",
      field: "mobileNumber",
    },
    {
      headerName: "Branch",
      field: "branch",
    },
    {
      headerName: "KYC",
      field: "kycStatus",
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AgGridTable
      rowData={customers}
      columnDefs={columnDefs}
      pageSize={5}
    />
  );
}

export default CustomerTable;
