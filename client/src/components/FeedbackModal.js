import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};
export default function FeedbackModal() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };
  function handleFeedback() {
    community.sendFeedback(feedback);
    setFeedback(1);
  }
  function handleClose(event) {
    community.setFeedback(false);
  }
  return (
    <Modal
      open={community.feedbackModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {feedback !== 1 ? (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Feedback
          </Typography>
          <TextField
            onChange={handleChange}
            name="feedback"
            fullWidth
            id="feedback"
            label="Add your feedback here:"
            autoFocus
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: 30,
                paddingLeft: 20,
                paddingBottom: 10,
              },
            }}
            InputLabelProps={{
              style: { fontSize: 30, paddingLeft: 20 },
              shrink: true,
            }}
          />
          <Button variant="contained" onClick={handleFeedback} sx={{ m: 1 }}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Thank You For Your Feedback!
          </Typography>
          <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
            Close
          </Button>
        </Box>
      )}
    </Modal>
  );
}
