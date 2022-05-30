import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";

const theme = createTheme();

export default function GuestScreen() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);
  const { game } = useContext(GameContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    let resp = await auth.createGuest(
      data.get("username"),
      data.get("lobbyCode")
    );
    if (resp == "user") {
      game.hostNewLobby();
    }
  };

  function handleCloseModal() {
    auth.removeErrorMessage();
  }
  if (auth.errorMessage) {
    return (
      <Box
        style={{
          backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
        }}
      >
        <div>
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Alert severity="error">{"Error: " + auth.errorMessage}</Alert>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" component="div" align="center">
              JART
            </Typography>
            <Typography component="h1" variant="h5">
              Guest
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    style={{
                      border: "3px solid",
                      borderColor: "black",
                      color: "black",
                      backgroundColor: "white",
                      fontSize: "32px",
                      borderRadius: 40,
                      outline: "none",
                    }}
                  >
                    <Box style={{ width: "96%" }}>
                      <TextField
                        required
                        fullWidth
                        variant="standard"
                        id="username"
                        label="Temporary Username:"
                        name="username"
                        // variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: 30,
                            paddingLeft: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 30, paddingLeft: 20 },
                          shrink: true,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    style={{
                      border: "3px solid",
                      borderColor: "black",
                      color: "black",
                      backgroundColor: "white",
                      fontSize: "32px",
                      borderRadius: 40,
                      outline: "none",
                    }}
                  >
                    <Box style={{ width: "96%" }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="lobbyCode"
                        label="Lobby Code:"
                        type="lobbyCode"
                        id="lobbyCode"
                        autoComplete="current-lobbyCode"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: 30,
                            paddingLeft: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 30, paddingLeft: 20 },
                          shrink: true,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    size="large"
                    style={{
                      fontWeight: 600,
                      border: "3px solid",
                      borderColor: "black",
                      backgroundColor: "#92C77F",
                      color: "black",
                      fontSize: "32px",
                    }}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Join Lobby
                  </Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login/" variant="body2">
                      {"Have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  } else {
    return (
      <Box
        style={{
          backgroundImage: "url('https://i.imgur.com/FQ01edj.jpg')",
        }}
      >
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h1" component="div" align="center">
              JART
            </Typography>
            <Typography component="h1" variant="h5">
              Guest
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    style={{
                      border: "3px solid",
                      borderColor: "black",
                      color: "black",
                      backgroundColor: "white",
                      fontSize: "32px",
                      borderRadius: 40,
                      outline: "none",
                    }}
                  >
                    <Box style={{ width: "96%" }}>
                      <TextField
                        required
                        fullWidth
                        variant="standard"
                        id="username"
                        label="Temporary Username:"
                        name="username"
                        // variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: 30,
                            paddingLeft: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 30, paddingLeft: 20 },
                          shrink: true,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    style={{
                      border: "3px solid",
                      borderColor: "black",
                      color: "black",
                      backgroundColor: "white",
                      fontSize: "32px",
                      borderRadius: 40,
                      outline: "none",
                    }}
                  >
                    <Box style={{ width: "96%" }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="lobbyCode"
                        label="Lobby Code:"
                        type="lobbyCode"
                        id="lobbyCode"
                        autoComplete="current-lobbyCode"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            fontSize: 30,
                            paddingLeft: 20,
                            paddingTop: 10,
                            paddingBottom: 10,
                          },
                        }}
                        InputLabelProps={{
                          style: { fontSize: 30, paddingLeft: 20 },
                          shrink: true,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    size="large"
                    style={{
                      fontWeight: 600,
                      border: "3px solid",
                      borderColor: "black",
                      backgroundColor: "#92C77F",
                      color: "black",
                      fontSize: "32px",
                    }}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Join Lobby
                  </Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login/" variant="body2">
                      {"Have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}
