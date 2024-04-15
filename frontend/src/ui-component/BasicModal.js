import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Checkbox from "@mui/material/Checkbox";
// import { useTheme } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "option" } };

export default function BasicModal(params) {
  const [open, setOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(true);
//   const theme = useTheme(); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={params.conClassName}> 
      <Button variant="contained" color="primary" className={params.className} onClick={handleOpen}>{params.text}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to publish this course?
          </Typography>
          {params.checkBox && (
            <div className="flex">
              <Checkbox
                className="mt-1"
                {...label}
                defaultChecked={isChecked}
                onChange={(event) => setIsChecked(event.target.checked)} // Update isChecked state
              />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Notify User on Publish
              </Typography>
            </div>
          )}
          {params.onClick && (
            <Button
              variant="contained"
              color="primary"
              className={params.btnClassName}
              onClick={() => {
                params.onClick(isChecked); // Pass isChecked value to onClick
                handleClose();
              }}
            >
            {params.text || "Submit"}
            </Button>
          )}

          <Button
            variant="outlined"
            color="primary"
            className={params.btnClassName}
            onClick={() => {
              handleClose();
            }}
          >
            Go Back
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
