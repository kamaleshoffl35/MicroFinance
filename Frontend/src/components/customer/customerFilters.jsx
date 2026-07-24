import { Row, Col } from "react-bootstrap";

import CustomerSearch from "./CustomerSearch";
import CustomerBranchFilter from "./CustomerBranchFilter";
import CustomerKycFilter from "./CustomerKycFilter";
import CustomerButton from "./CustomerButton";

function CustomerFilters({setActiveTab,search,setSearch,}) {
  return (
    <Row className="mt-3 g-2 align-items-center">

      <Col md={6}>
        <CustomerSearch
  search={search}
  setSearch={setSearch}
/>
      </Col>

      <Col md={2}>
        <CustomerBranchFilter />
      </Col>

      <Col md={2}>
        <CustomerKycFilter />
      </Col>

      <Col md={2}>
        <CustomerButton
    setActiveTab={setActiveTab}
/>
      </Col>

    </Row>
  );
}

export default CustomerFilters;