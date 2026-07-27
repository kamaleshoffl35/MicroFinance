import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar({ show }) {
  return (
    <div className={`sidebar overflow-hidden flex-shrink-0 ${show ? "sidebar-open" : "sidebar-close"}`}>

      <Nav className="flex-column mt-3">

        <Nav.Link as={Link} to="/">
          Dashboard
        </Nav.Link>

        <Nav.Link as={Link} to="/customer">
          Customer
        </Nav.Link>

        <Nav.Link as={Link} to="/loan">
          Loan Management
        </Nav.Link>

      </Nav>

    </div>
  );
}

export default Sidebar;