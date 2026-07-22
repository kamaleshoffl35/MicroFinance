import { Navbar, Container, Nav } from "react-bootstrap";

function TopNavbar({ handleShow }) {
  return (
    <Navbar bg="dark" variant="dark">

      <Container fluid className="px-3">

        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={handleShow}
        >
          ☰ MICROFINANCE
        </Navbar.Brand>

        <Nav className="ms-auto">

          <Nav.Link>
            SA
          </Nav.Link>

        </Nav>

      </Container>

    </Navbar>
  );
}

export default TopNavbar;