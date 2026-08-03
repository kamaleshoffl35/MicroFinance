import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import AppSnackbar from "../common/AppSnackbar";
import { useDispatch } from "react-redux";
import { addUser, updateUser, fetchUsers } from "../../redux/usersSlice";
import { useSelector } from "react-redux";
import { fetchRoles } from "../../redux/rolesSlice";
import { fetchPermissions, addPermission } from "../../redux/permissionSlice";
function UserRegistration({ selectedUser, setShowModal }) {
  const dispatch = useDispatch();
  const { permissions } = useSelector((state) => state.permissions);
  const { roles } = useSelector((state) => state.roles);

  const [permissionName, setPermissionName] = useState("");

  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        role: selectedUser.role.toLowerCase(),
      });

      // Already assigned permissions
      setSelectedPermissions(selectedUser.permissions?.map((p) => p._id) || []);
    } else {
      // New User
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "staff",
      });

      setSelectedPermissions([]);
    }
  }, [selectedUser]);
  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchPermissions());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedUser) {
        await dispatch(
          updateUser({
            id: selectedUser._id,

            data: {
              ...formData,

              permissions: selectedPermissions,
            },
          }),
        ).unwrap();
        await dispatch(fetchUsers());
        setSnackbar({
          open: true,
          message: "User updated successfully!",
          severity: "success",
        });
      } else {
        await dispatch(
          addUser({
            ...formData,

            permissions: selectedPermissions,
          }),
        ).unwrap();

        setSnackbar({
          open: true,
          message: "User registered successfully!",
          severity: "success",
        });
      }

      setTimeout(() => {
        setShowModal(false);
      }, 1200);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Something went wrong",
        severity: "error",
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handlePermissionCheck = (id) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions(selectedPermissions.filter((x) => x !== id));
    } else {
      setSelectedPermissions([...selectedPermissions, id]);
    }
  };

  const handleAddPermission = async () => {
    if (permissionName.trim() === "") return;

    try {
      await dispatch(addPermission(permissionName)).unwrap();

      setPermissionName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Side */}
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {!selectedUser && (
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <option key={role._id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          {/* Right Side */}
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Permission</Form.Label>

              <div className="d-flex gap-2">
                <Form.Control
                  placeholder="Permission Name"
                  value={permissionName}
                  onChange={(e) => setPermissionName(e.target.value)}
                />

                <Button
                  type="button"
                  className="add"
                  onClick={handleAddPermission}
                >
                  Add
                </Button>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Permissions</Form.Label>

              <div
                className="border rounded p-3"
                style={{
                  maxHeight: "220px",
                  overflowY: "auto",
                }}
              >
                {permissions.map((item) => (
                  <Form.Check
                    key={item._id}
                    type="checkbox"
                    label={item.name}
                    checked={selectedPermissions.includes(item._id)}
                    onChange={() => handlePermissionCheck(item._id)}
                    className="mb-2"
                  />
                ))}
              </div>
            </Form.Group>
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>

          <Button type="submit" className="add">
            {selectedUser ? "Update User" : "Register User"}
          </Button>
        </div>
      </Form>

      <AppSnackbar
        open={snackbar.open}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
}

export default UserRegistration;
