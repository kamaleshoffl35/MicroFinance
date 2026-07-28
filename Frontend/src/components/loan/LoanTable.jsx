import AgGridTable from "../common/AgGridTable";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoans } from "../../redux/loanSlice";
function LoanTable({ search }) {
  const dispatch = useDispatch();

const { loans } = useSelector((state) => state.loan);

useEffect(() => {
  dispatch(fetchLoans());
}, [dispatch]);
 const rowData = loans.map((loan) => ({
  loanId: loan._id.slice(-6),

  customer:
    loan.customer?.customerName || "-",

  type: loan.loanType,

  principal:
    `₹${Number(loan.loanAmount).toLocaleString("en-IN")}`,

  tenure:
    `${loan.tenure} Months`,

  status:
    loan.status || "Pending",
}));
  const filteredRows = rowData.filter((loan) =>

  loan.loanId
    .toLowerCase()
    .includes(search.toLowerCase()) ||

  loan.customer
    .toLowerCase()
    .includes(search.toLowerCase())
);

if (status === "Approved") bg = "success";
else if (status === "Pending") bg = "warning";
else if (status === "Rejected") bg = "danger";
else if (status === "Disbursed") bg = "primary";
else if (status === "Closed") bg = "dark";

  const columnDefs = [
    {
      headerName: "Loan ID",
      field: "loanId",
    },
    {
      headerName: "Customer",
      field: "customer",
    },
    {
      headerName: "Loan Type",
      field: "type",
    },
    {
      headerName: "Principal",
      field: "principal",
    },
    {
      headerName: "Tenure",
      field: "tenure",
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: (params) => {
        const status = params.value;

        let bg = "secondary";

        if (status === "Disbursed") bg = "success";
        else if (status === "Awaiting Approval") bg = "warning";
        else if (status === "Rejected") bg = "danger";
        else if (status === "Closed") bg = "dark";

        return (
          <Badge bg={bg}>
            {status}
          </Badge>
        );
      },
    },
  ];

  return (
    <AgGridTable
      rowData={filteredRows}
      columnDefs={columnDefs}
      showActions={true}
      actionRenderer={(params) => (
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => console.log(params.data)}
        >
          Open
        </Button>
      )}
    />
  );
}

export default LoanTable;