import { Row, Col } from "react-bootstrap";

import LoanSearch from "./LoanSearch";
import LoanTypeFilter from "./LoanTypeFilter";
import LoanStatusFilter from "./LoanStatusFilter";
import LoanButton from "./LoanButton";

function LoanFilters({
  search,
  setSearch,
  setActiveTab,
  setShowModal,
  setSelectedLoan,
}) {
  return (
    <Row className="mt-3 align-items-center g-3">
      <Col md={5}>
        <LoanSearch search={search} setSearch={setSearch} />
      </Col>

      <Col md={2}>
        <LoanTypeFilter />
      </Col>

      <Col md={2}>
        <LoanStatusFilter />
      </Col>

      <Col md={3} className="d-grid">
        <LoanButton
          setShowModal={setShowModal}
          setSelectedLoan={setSelectedLoan}
        />
      </Col>
    </Row>
  );
}

export default LoanFilters;
