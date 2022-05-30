import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import PostFeed from "./PostFeed.js";
import Sidebar from "./Sidebar.js";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { SocketContext } from "../socket";
export default function CommunityScreen() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { community } = useContext(GlobalCommunityContext);
  const { game } = useContext(GameContext);
  const { auth } = useContext(AuthContext);
  
  const socket = useContext(SocketContext);
  const [loaded, setLoaded] = useState(false);
  const [gameLobbyID, setLobbyID] = React.useState(false);
  const [inviteName, setInviteName] = React.useState(false);
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

  const handleJoin = (event) => {
    event.preventDefault();
    console.log("new lobby");
    console.log("lobby join from invite:", gameLobbyID);
    game.joinLobby(gameLobbyID);
  };

  const action = (
    <React.Fragment>
      {/* On click here will join the game lobby (button) */}
      <Button color="secondary" size="large" onClick={handleJoin}>
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
  
  const handleBackToCommunities = (event) => {
    event.stopPropagation();
    community.setCommunity(null);
  };

  const handleHostNewGame = (event) => {
    event.preventDefault();
    game.hostNewLobby(community.currentCommunity.communityName);
  };

  const joinCommunity = (event) => {
    event.preventDefault();
    community.joinCommunity(community.currentCommunity.communityName);
  };

  const leaveCommunity = (event) => {
    event.preventDefault();
    community.leaveCommunity(community.currentCommunity.communityName);
  };

  let joinLeaveButton = (
    <Button
      variant="contained"
      color="success"
      size="small"
      align="center"
      onClick={joinCommunity}
      style={{
        fontWeight: 600,
        border: "3px solid",
        borderColor: "black",
        backgroundColor: "green",
        color: "black",
        fontSize: "10px",
        borderRadius: 20,
      }}
      sx={{ ml: 2, mb: 2 }}
    >
      Join
    </Button>
  );

  if (
    community.currentCommunity.communityMembers.includes(auth.user.username)
  ) {
    joinLeaveButton = (
      <Button
        variant="contained"
        color="success"
        size="small"
        align="center"
        onClick={leaveCommunity}
        style={{
          fontWeight: 600,
          border: "3px solid",
          borderColor: "black",
          backgroundColor: "red",
          color: "black",
          fontSize: "10px",
          borderRadius: 20,
        }}
        sx={{ ml: 2, mb: 2 }}
      >
        Leave
      </Button>
    );
  }

  useEffect(() => {
    const invite = async (lobbyID, socketid, hostName) => {
      setLobbyID(lobbyID);
      setInviteName(hostName);
      console.log("inside the invite with lobbyID", lobbyID);
      console.log("socketID is", socketid);
      handleClick();

      // game.joinLobby(lobbyID)
    };
    socket.on("receive-invite", invite);

    if (!loaded) {
      community.getCommunities();
      setLoaded(true);
    }

    const lobbyConfirmed = async (username, lobbyID, confirmed) => {
      console.log("listener:", username, lobbyID, confirmed);
      console.log(auth.user);
      if (username == auth.user.username) {
        console.log("checking confirmed");
        if (confirmed) {
          game.confirmJoinLobby(lobbyID);
        }
       else {
        community.lobbyUnavailable();
      }
    }
    };

    socket.on("lobby-confirmed", lobbyConfirmed);

    return () => {
      socket.off("receive-invite", invite);
      socket.off("lobby-confirmed", lobbyConfirmed);

    };
  }, [auth]);

  return (
    <Box style={{ backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="success"
            size="small"
            align="center"
            onClick={handleBackToCommunities}
            style={{
              fontWeight: 600,
              border: "3px solid",
              borderColor: "black",
              backgroundColor: "orange",
              color: "black",
              fontSize: "10px",
              borderRadius: 20,
            }}
            sx={{ mt: 2 }}
          >
            Back to Communities
          </Button>
        </Grid>
        <Grid item xs={8} textAlign="center">
          <Typography
            display="inline"
            style={{ fontSize: "48px" }}
            sx={{ ml: 20 }}
          >
            {community.currentCommunity.communityName}
          </Typography>
          {joinLeaveButton}
        </Grid>
        <Grid item xs={4}>
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
              Host New Game
            </Typography>
            <Box textAlign="center">
              <Button
                variant="contained"
                color="success"
                size="small"
                style={{
                  fontWeight: 600,
                  border: "3px solid",
                  borderColor: "black",
                  backgroundColor: "#46EC2B",
                  color: "black",
                  fontSize: "24px",
                  borderRadius: 50,
                }}
                sx={{ mb: 0.5, width: "25%" }}
                onClick={handleHostNewGame}
              >
                +
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <PostFeed />
        </Grid>

        <div className="sticky">
          {/* <Sticky> */}
          <Sidebar />
          {/* </Sticky> */}
        </div>
      </Grid>
      <Snackbar
        open={openInvite}
        autoHideDuration={6000}
        onClose={handleClose}
        message={inviteName + " has invited you to the game"}
        action={action}
      />
    </Box>
  );
}
