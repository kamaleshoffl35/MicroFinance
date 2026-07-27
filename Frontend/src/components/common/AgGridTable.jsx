import { AgGridReact } from "ag-grid-react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function AgGridTable({
  rowData,
  columnDefs,
  height = "500px",
  showActions = false,
  onView,
  onEdit,
  onDelete,
  actionRenderer,
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

  const actionColumn = {
    headerName: "Actions",
    field: "actions",
    sortable: false,
    filter: false,
    floatingFilter: false,
    width: 150,
    cellRenderer: (params) => {
      if (actionRenderer) {
        return actionRenderer(params);
      }

      return (
        <div className="d-flex gap-3">
          <FaEye
            style={{ cursor: "pointer", color: "#0d6efd" }}
            title="View"
            onClick={() => onView?.(params.data)}
          />

          <FaEdit
            style={{ cursor: "pointer", color: "#198754" }}
            title="Edit"
            onClick={() => onEdit?.(params.data)}
          />

          <FaTrash
            style={{ cursor: "pointer", color: "#dc3545" }}
            title="Delete"
            onClick={() => onDelete?.(params.data)}
          />
        </div>
      );
    },
  };

  const finalColumnDefs = showActions
    ? [...columnDefs, actionColumn]
    : columnDefs;

  return (
    <div
      className="ag-theme-alpine custom-grid mt-3 border rounded-2 p-3"
      style={{
        height,
        width: "100%",
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={finalColumnDefs}
        defaultColDef={defaultColDef}
        rowHeight={60}
        headerHeight={55}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[5, 10, 20, 50, 100]}
      />
    </div>
  );
}

export default AgGridTable;
