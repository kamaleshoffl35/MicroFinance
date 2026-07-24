import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../redux/customerSlice";

function CustomerBranchFilter({ value, onChange }) {
  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.customer);

  useEffect(() => {
    if (customers.length === 0) {
      dispatch(fetchCustomers());
    }
  }, [dispatch, customers.length]);

  // Unique Branches
  const branches = [...new Set(customers.map((item) => item.branch).filter(Boolean))];

  return (
    <Form.Select value={value} onChange={onChange}>
      <option value="">All Branches</option>

      {branches.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </Form.Select>
  );
}

export default CustomerBranchFilter;