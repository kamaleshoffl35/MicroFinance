import AgGridTable from "../common/AgGridTable";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

function LoanTable({ search }) {
  const rowData = [
    {
      loanId: "LN-20264",
      customer: "Ravi Kumar",
      type: "Personal",
      principal: "₹80,000",
      tenure: "12 Months",
      status: "Awaiting Approval",
    },
    {
      loanId: "LN-20211",
      customer: "Meena Kandasamy",
      type: "Business",
      principal: "₹2,50,000",
      tenure: "24 Months",
      status: "Disbursed",
    },
    {
      loanId: "LN-20198",
      customer: "Karthik M",
      type: "Gold",
      principal: "₹1,10,000",
      tenure: "6 Months",
      status: "Disbursed",
    },
  ];

  const filteredRows = rowData.filter((loan) => {
    return (
      loan.loanId.toLowerCase().includes(search.toLowerCase()) ||
      loan.customer.toLowerCase().includes(search.toLowerCase())
    );
  });

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