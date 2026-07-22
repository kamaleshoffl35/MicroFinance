import { Nav } from "react-bootstrap";

function CustomerTabs({ activeTab, setActiveTab }) {
  return (
    <Nav variant="tabs" activeKey={activeTab}>

      <Nav.Item>
        <Nav.Link onClick={() => setActiveTab("list")}>
          Customer List
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link onClick={() => setActiveTab("registration")}>
          New Registration
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link onClick={() => setActiveTab("kyc")}>
          KYC Verification
        </Nav.Link>
      </Nav.Item>

    </Nav>
  );
}

export default CustomerTabs;