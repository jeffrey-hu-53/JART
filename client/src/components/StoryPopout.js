import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import jsPDF from "jspdf";
import * as React from "react";
import ReactQuill from "react-quill";

export default function StoryPopout(props) {
  const { post, index } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  function downloadPost(event) {
    event.stopPropagation();
    let input = document.getElementById("data" + index);
    console.log(input);
    const pdf = new jsPDF("p", "pt", "a4");
    pdf.html(input).then(() => pdf.save(post.postTitle + ".pdf"));
  }

  return (
    <div>
      <ReactQuill
        readOnly={true}
        theme="bubble"
        value={post.data.panels[0]}
      ></ReactQuill>
      <Button style={{ fontSize: 28 }} onClick={handleClickOpen()}>
        Read Full Story
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{post.postTitle}</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box id={"data" + index}>
              {post.data.panels.map((paragraph, index) => (
                <ReactQuill
                  key={index}
                  readOnly={true}
                  theme="bubble"
                  value={paragraph}
                ></ReactQuill>
              ))}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton color="primary" onClick={downloadPost}>
            <DownloadIcon
              sx={{
                width: 40,
                height: 40,
              }}
            />
          </IconButton>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
