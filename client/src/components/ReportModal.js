import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  Typography,
} from "@mui/material/";
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
  textAlign: "left",
  p: 4,
};
export default function ReportModal() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const [newReport, setNewReport] = useState("");

  function handleChange(event) {
    console.log(event.target.value);
    setNewReport(event.target.value);
  }

  function handleClose(event) {
    setNewReport("");
    auth.setErrorMessage("");
    community.setReportModal(false, null);
  }

  async function handleCreateReport(event) {
    const response = await community.createReport(
      auth.user._id,
      community.reportPost._id,
      auth.user.username,
      community.reportPost.postTitle,
      community.reportPost.communityName,
      newReport
    );
    console.log("Create report response:", response);
    handleClose();
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    textAlign: "left",
    p: 4,
  };

  return (
    <Modal
      open={community.reportModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={style}>
        <Typography sx={{ fontSize: 28, marginBottom: "-10px" }}>
          Reason for Report:
        </Typography>
        <FormControl fullWidth sx={{}} variant="standard">
          <Input id="standard-adornment-biography" onChange={handleChange} />
        </FormControl>
        <Button variant="contained" onClick={handleCreateReport} sx={{ m: 1 }}>
          Confirm
        </Button>
        <Button variant="outlined" onClick={handleClose} sx={{ m: 1 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}
