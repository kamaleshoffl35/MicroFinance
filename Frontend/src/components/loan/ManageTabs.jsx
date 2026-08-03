import { Nav } from "react-bootstrap";

function ManageTabs({ manageTab, setManageTab }) {
  return (
    <Nav
      variant="tabs"
      activeKey={manageTab}
      className="mt-4"
    >
      <Nav.Item>
        <Nav.Link
          eventKey="types"
          onClick={() => setManageTab("types")}
        >
          Loan Types
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          eventKey="tenure"
          onClick={() => setManageTab("tenure")}
        >
          Tenure
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          eventKey="repayment"
          onClick={() => setManageTab("repayment")}
        >
          Repayment Types
        </Nav.Link>
      </Nav.Item>

    
    </Nav>
  );
}

export default ManageTabs;