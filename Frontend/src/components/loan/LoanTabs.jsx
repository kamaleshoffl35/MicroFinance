import { Nav } from "react-bootstrap";

function LoanTabs({ activeTab, setActiveTab }) {

  return (

    <Nav
      variant="tabs"
      activeKey={activeTab}
      onSelect={(k)=>setActiveTab(k)}
      className="mt-3"
    >

      <Nav.Item>
        <Nav.Link eventKey="list">
          Loan List
        </Nav.Link>
      </Nav.Item>

    </Nav>

  );

}

export default LoanTabs;