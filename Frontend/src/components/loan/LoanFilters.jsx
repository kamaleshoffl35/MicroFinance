import { Row, Col } from "react-bootstrap";

import LoanSearch from "./LoanSearch";
import LoanTypeFilter from "./LoanTypeFilter";
import LoanStatusFilter from "./LoanStatusFilter";
import LoanButton from "./LoanButton";

function LoanFilters({ search, setSearch, setActiveTab }) {
  return (
    <Row className="mt-3 g-2 align-items-center">
      <Col md={6}>
        <LoanSearch search={search} setSearch={setSearch} />
      </Col>

      <Col md={2}>
        <LoanTypeFilter />
      </Col>

      <Col md={2}>
        <LoanStatusFilter />
      </Col>

      <Col md={2}>
        <LoanButton setActiveTab={setActiveTab} />
      </Col>
    </Row>
  );
}

export default LoanFilters;
