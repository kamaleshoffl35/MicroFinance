import { Snackbar, Alert } from "@mui/material";

function AppSnackbar({
  open,
  onClose,
  message,
  severity = "success",
  autoHideDuration = 3000,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackbar;
