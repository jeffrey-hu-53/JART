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

const theme = createTheme();

export default function LoginScreen() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);
  console.log("auth currently:", auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit");
    const data = new FormData(event.currentTarget);
    auth.loginUser(data.get("username"), data.get("password"));
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
              Login
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
                        defaultValue={
                          auth.userData ? auth.userData.username : ""
                        }
                        required
                        fullWidth
                        variant="standard"
                        id="username"
                        label="Username:"
                        name="username"
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
                        defaultValue={auth.userData ? auth.userData.password : ""}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password:"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
                    Sign In
                  </Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item xs>
                    <Link href="/reset/" variant="body2" sx={{ fontSize: 24 }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/register/"
                      variant="body2"
                      sx={{ fontSize: 24 }}
                    >
                      {"Don't have an account? Sign Up"}
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
              Login
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
                        defaultValue={auth.userData ? auth.userData.username : ""}
                        required
                        fullWidth
                        variant="standard"
                        id="username"
                        label="Username:"
                        name="username"
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
                        defaultValue={auth.userData ? auth.userData.password : ""}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password:"
                        type="password"
                        id="password"
                        autoComplete="current-password"
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
                    Sign In
                  </Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                  <Grid item xs>
                    <Link href="/reset/" variant="body2" sx={{ fontSize: 24 }}>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/register/"
                      variant="body2"
                      sx={{ fontSize: 24 }}
                    >
                      {"Don't have an account? Sign Up"}
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
