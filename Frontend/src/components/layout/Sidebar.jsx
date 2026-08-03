import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ show }) {
  const { user } = useAuth();

  const permissions = user?.permissions?.map((x) => x.name) || [];
  const isAdmin = user?.role === "admin";
  return (
    <div
      className={`sidebar text-white overflow-hidden flex-shrink-0 ${
        show ? "sidebar-open" : "sidebar-close"
      }`}
    >
      <Nav className="flex-column mt-3">
        <Nav.Link as={Link} to="/" className="sidebar-link">
          <MdDashboard className="sidebar-icon" />
          <span>Dashboard</span>
        </Nav.Link>

        {(isAdmin || permissions.includes("Customer")) && (
          <Nav.Link as={Link} to="/customer" className="sidebar-link">
            <BsFillPersonFill className="sidebar-icon" />
            <span>Customer</span>
          </Nav.Link>
        )}

        {(isAdmin || permissions.includes("Loan Management")) && (
          <Nav.Link as={Link} to="/loan" className="sidebar-link">
            <GiTakeMyMoney className="sidebar-icon" />
            <span>Loan Management</span>
          </Nav.Link>
        )}

        {(isAdmin || permissions.includes("Users")) && (
          <Nav.Link as={Link} to="/users" className="sidebar-link">
            <FaUsers className="sidebar-icon" />
            <span>Users</span>
          </Nav.Link>
        )}
      </Nav>
    </div>
  );
}

export default Sidebar;
