import { Nav } from "react-bootstrap";

function LoanTabs({ activeTab, setActiveTab }) {
  return (
    <Nav variant="tabs" activeKey={activeTab} className="mt-3">
      <Nav.Item>
        <Nav.Link
          eventKey="list"
          onClick={() => setActiveTab("list")}
        >
          Loan List
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          eventKey="application"
          onClick={() => setActiveTab("application")}
        >
          New Loan Application
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default LoanTabs;