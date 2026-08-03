import { useMemo, useState, useEffect } from "react";
import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import UserRegistration from "../components/users/UserRegistration";
import AgGridTable from "../components/common/AgGridTable";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { fetchUsers, deleteUser } from "../redux/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, addRole } from "../redux/rolesSlice";
function UsersManagement() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showView, setShowView] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleLoading, setRoleLoading] = useState(false);
  const { users, loading } = useSelector((state) => state.users);
  const { roles } = useSelector((state) => state.roles);
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  const rowData = users.map((user, index) => ({
    _id: user._id,
    employeeId: `USER${String(index + 1).padStart(3, "0")}`,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.isActive ? "Active" : "Inactive",
    permissions: user.permissions,
  }));

  const handleDeleteClick = (row) => {
    setDeleteUserId(row._id);
    setShowDeleteDialog(true);
  };
  const handleAddRole = async () => {
    if (!roleName.trim()) {
      alert("Please enter a role name");
      return;
    }

    try {
      setRoleLoading(true);

      await dispatch(
        addRole({
          name: roleName,
        }),
      ).unwrap();

      setRoleName("");
      setShowRoleModal(false);

      setSnackbar({
        open: true,
        message: "Role added successfully",
        severity: "success",
      });

      dispatch(fetchRoles());

      setRoleName("");
      setShowRoleModal(false);

      dispatch(fetchRoles());
    } catch (err) {
      setSnackbar({
        open: true,
        message: err || "Failed to add role",
        severity: "error",
      });
    } finally {
      setRoleLoading(false);
    }
  };
  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);

      await dispatch(deleteUser(deleteUserId)).unwrap();

      setShowDeleteDialog(false);
      setDeleteUserId(null);
    } catch (err) {
      console.log(err);
    } finally {
      setDeleteLoading(false);
    }
  };
  const columnDefs = useMemo(
    () => [
      {
        headerName: "User ID",
        field: "employeeId",
      },
      {
        headerName: "Name",
        field: "name",
      },
      {
        headerName: "Email",
        field: "email",
      },
      {
        headerName: "Role",
        field: "role",
      },
      {
        headerName: "Status",
        field: "status",
        cellRenderer: (params) => (
          <span
            className={`badge ${
              params.value === "Active" ? "bg-success" : "bg-danger"
            }`}
          >
            {params.value}
          </span>
        ),
      },
    ],
    [],
  );
  if (loading) {
    return <h5>Loading users...</h5>;
  }

  const filteredUsers = rowData.filter((user) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(keyword) ||
      user.email?.toLowerCase().includes(keyword) ||
      user.employeeId?.toLowerCase().includes(keyword);

    const matchesRole =
      roleFilter === "" || user.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });
  return (
    <div className="customer-management-wrapper">
      <h4>Users Management</h4>

      <p className="text-secondary">Manage system users and their roles.</p>

      <hr />

      <div className="d-flex align-items-center gap-2 mb-3">
        <Form.Control
          placeholder="Search by name, email or employee ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Form.Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>

          {roles.map((role) => (
            <option key={role._id} value={role.name}>
              {role.name}
            </option>
          ))}
        </Form.Select>

        <Button
          variant="outline-secondary"
          className="text-nowrap"
          onClick={() => setShowRoleModal(true)}
        >
          Add Role
        </Button>

        <Button
          className="add text-nowrap"
          onClick={() => {
            setSelectedUser(null);
            setShowModal(true);
          }}
        >
          Add User
        </Button>
      </div>
      {/* AG Grid */}

      <AgGridTable
        rowData={filteredUsers}
        columnDefs={columnDefs}
        showActions={true}
        height="500px"
        onView={(row) => {
          setViewUser(row);
          setShowView(true);
        }}
        onEdit={(row) => {
          setSelectedUser(row);
          setShowModal(true);
        }}
        onDelete={handleDeleteClick}
      />
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setSelectedUser(null);
        }}
        centered
        dialogClassName="user-registration-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? "Edit User" : "New User Registration"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UserRegistration
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        centered
        dialogClassName="user-view-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {viewUser && (
            <Row>
              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <h6 className="fw-bold border-bottom pb-2 mb-3">
                      Basic Details
                    </h6>

                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <b>User ID</b>
                        <br />
                        {viewUser.employeeId}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Name</b>
                        <br />
                        {viewUser.name}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Email</b>
                        <br />
                        {viewUser.email}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Role</b>
                        <br />
                        {viewUser.role}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <b>Status</b>
                        <br />
                        <Badge
                          bg={
                            viewUser.status === "Active" ? "success" : "danger"
                          }
                        >
                          {viewUser.status}
                        </Badge>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body>
                    <h6 className="fw-bold border-bottom pb-2 mb-3">
                      Permissions
                    </h6>

                    {viewUser.permissions?.length > 0 ? (
                      <div className="d-flex flex-wrap gap-2">
                        {viewUser.permissions.map((item) => (
                          <Badge key={item._id} bg="primary">
                            {item.name}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No Permissions Assigned</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={showRoleModal}
        onHide={() => {
          setShowRoleModal(false);
          setRoleName("");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Role Name</Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </Form.Group>

          <hr />

          <h6>Available Roles</h6>

          <div
            className="border rounded p-2"
            style={{
              maxHeight: "180px",
              overflowY: "auto",
            }}
          >
            {roles.length > 0 ? (
              roles.map((role) => (
                <div
                  key={role._id}
                  className="d-flex justify-content-between align-items-center border-bottom py-2"
                >
                  <span>{role.name}</span>
                </div>
              ))
            ) : (
              <p className="text-muted mb-0">No roles found</p>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => {
              setShowRoleModal(false);
              setRoleName("");
            }}
          >
            Cancel
          </Button>

          <Button
            className="add"
            onClick={handleAddRole}
            disabled={roleLoading}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmDialog
        show={showDeleteDialog}
        onHide={() => {
          setShowDeleteDialog(false);
          setDeleteUserId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message="Are you sure you want to delete this user?"
        confirmText="Delete"
        loading={deleteLoading}
      />
    </div>
  );
}

export default UsersManagement;
