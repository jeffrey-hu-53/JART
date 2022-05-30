import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
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
export default function DeletePostModal() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  function handleDeletePost(event) {
    community.removePost();
  }
  function handleClose(event) {
    community.setDeletePost(false, null);
  }
  if (community.deletePost) {
    console.log(community.deletePost);
    return (
      <Modal
        open={community.deletePostModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            {"Are you sure you want to delete " +
              community.deletePost.postTitle +
              "?"}
          </Typography>
          <Button variant="contained" onClick={handleDeletePost} sx={{ m: 1 }}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    );
  } else {
    return "";
  }
}
