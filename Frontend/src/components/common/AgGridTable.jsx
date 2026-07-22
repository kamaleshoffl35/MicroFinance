import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function AgGridTable({
  rowData,
  columnDefs,
  height = "500px",
}) {
  const defaultColDef = {
  flex: 1,
  sortable: true,
  filter: true,
  floatingFilter: true,
  resizable: true,

  cellStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  headerClass: "header-center",
};

  return (
    <div
      className="ag-theme-alpine custom-grid mt-3"
      style={{
        height,
        width: "100%",
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowHeight={55}
        headerHeight={50}
        pagination={true}
        paginationPageSize={10}
        rowHeight={60}
    headerHeight={55}
        paginationPageSizeSelector={[5, 10, 20, 50, 100]}
      />
    </div>
  );
}

export default AgGridTable;