const { Modal, Typography, TextField, Button, MenuItem } = require("@mui/material");
const { Box } = require("@mui/system");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddUserModal = (params) => {

  return (
    <Modal
      open={params?.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add New User
        </Typography>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          select
          label="Role"
          margin="normal"
          variant="outlined"
          required
        >
          <MenuItem value="ADMIN">ADMIN</MenuItem>
          <MenuItem value="USER">USER</MenuItem>
          <MenuItem value="INSTRUCTOR">INSTRUCTOR</MenuItem>
        </TextField>
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={() => {
              params.handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => {
              // Implement the logic to add user
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
