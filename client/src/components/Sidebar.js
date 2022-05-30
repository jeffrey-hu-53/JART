import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useState } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import Snackbar from "@mui/material/Snackbar";

export default function Sidebar() {
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);
  const [message, setMessage] = React.useState(false);
  const [gameInviteOpen, setGameInviteOpen] = React.useState(false);
  const [openInvite, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleAddFriend = async (event) => {
    event.preventDefault();
    console.log("handleAddFriend here");
    const data = new FormData(event.currentTarget);
    console.log("here")

    let friendResponse = await auth.sendFriendRequest(auth.user.email, data.get("email").toLowerCase());
    
    console.log("The friend response is ", friendResponse)
    
    if(friendResponse){
      setOpen(true)
      setMessage("Send Friend Request")
    }
    else{
      setOpen(true)
      setMessage("Invalid Email")
    }
  };

  const handleLobbyJoin = (event) => {
    event.preventDefault();
    console.log("new lobby");
    const data = new FormData(event.currentTarget);
    let lobbyID = data.get("lobbyCode");
    console.log("lobby join from sidebar:", lobbyID);

    game.joinLobby(lobbyID);
  };

  const [comError, setComError] = useState(false)

  async function handleCreateCommunity(event){
    event.preventDefault();
    console.log("create new community");
    const data = new FormData(event.currentTarget);
    let communityName = data.get("communityName");
    let value = community.createNewCommunity(communityName);
    setComError(value)
  };

  const action = (
    <React.Fragment>
      {/* On click here will join the game lobby (button) */}
      <Button color="secondary" size="large" onClick={handleClose}>
        JOIN
      </Button>
      <IconButton
        size="large"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <List>
      <ListItem key="addFriend">
        <Box
          justifyContent="center"
          alignItems="center"
          style={{
            border: "3px solid",
            borderColor: "black",
            color: "black",
            backgroundColor: "#E39090",
            fontSize: "20px",
            outline: "none",
            borderRadius: 20,
            width: "75%",
          }}
        >
          <Typography align="center" style={{ fontSize: "32px" }}>
            Add a friend c:
          </Typography>
          <Box component="form" onSubmit={handleAddFriend} noValidate>
            <Box
              m="auto"
              textAlign="center"
              style={{
                border: "3px solid",
                borderColor: "black",
                color: "black",
                backgroundColor: "white",
                fontSize: "32px",
                borderRadius: 40,
                outline: "none",
                width: "85%",
              }}
            >
              <TextField
                align="center"
                id="email"
                name="email"
                label="Enter friend's email:"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: 20,
                    paddingLeft: 20,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 30, paddingLeft: 20 },
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="small"
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "#46EC2B",
                  color: "black",
                  fontSize: "20px",
                  borderRadius: 20,
                }}
                sx={{ mt: 1, mb: 0.5, width: "25%" }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </ListItem>
      <ListItem key="join">
        <Box
          justifyContent="center"
          alignItems="center"
          style={{
            border: "3px solid",
            borderColor: "black",
            color: "black",
            backgroundColor: "#E39090",
            fontSize: "20px",
            outline: "none",
            borderRadius: 20,
            width: "75%",
          }}
        >
          <Typography align="center" style={{ fontSize: "32px" }}>
            Join A Lobby
          </Typography>
          <Box component="form" onSubmit={handleLobbyJoin} noValidate>
            <Box
              m="auto"
              textAlign="center"
              style={{
                border: "3px solid",
                borderColor: "black",
                color: "black",
                backgroundColor: "white",
                fontSize: "32px",
                borderRadius: 40,
                outline: "none",
                width: "85%",
              }}
            >
              <TextField
                align="center"
                id="lobbyCode"
                name="lobbyCode"
                label="Enter Lobby Code:"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: 20,
                    paddingLeft: 20,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 30, paddingLeft: 20 },
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="small"
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "#46EC2B",
                  color: "black",
                  fontSize: "20px",
                  borderRadius: 20,
                }}
                sx={{ mt: 1, mb: 0.5, width: "25%" }}
              >
                Join
              </Button>
            </Box>
          </Box>
        </Box>
      </ListItem>
      <ListItem key="create">
        <Box
          justifyContent="center"
          alignItems="center"
          style={{
            border: "3px solid",
            borderColor: "black",
            color: "black",
            backgroundColor: "#E39090",
            fontSize: "20px",
            outline: "none",
            borderRadius: 20,
            width: "75%",
          }}
        >
          <Typography align="center" style={{ fontSize: "32px" }}>
            {" "}
            Create New Community
          </Typography>
          <Box component="form" onSubmit={handleCreateCommunity} noValidate>
            <Box
              m="auto"
              textAlign="center"
              style={{
                border: "3px solid",
                borderColor: "black",
                color: "black",
                backgroundColor: "white",
                fontSize: "32px",
                borderRadius: 40,
                outline: "none",
                width: "85%",
              }}
            >
              <TextField
                error={comError}
                helperText = {comError && 'Community Already Created'}
                align="center"
                id="communityName"
                name="communityName"
                label="Enter A Community Name:"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: 20,
                    paddingLeft: 20,
                    paddingBottom: 10,
                  },
                }}
                InputLabelProps={{
                  style: { fontSize: 24, paddingLeft: 20 },
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="small"
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "#46EC2B",
                  color: "black",
                  fontSize: "20px",
                  borderRadius: 20,
                }}
                sx={{ mt: 1, mb: 0.5, width: "35%" }}
              >
                Create!
              </Button>
            </Box>
          </Box>
        </Box>
      </ListItem>
      <Snackbar
        open={openInvite}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </List>
  );
}
