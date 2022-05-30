import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import AuthContext from "../auth";
import { GlobalCommunityContext } from "../community";

export default function RegisterScreen() {
  const { auth } = useContext(AuthContext);
  const { community } = useContext(GlobalCommunityContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.registerUser(
      formData.get("firstName"),
      formData.get("lastName"),
      formData.get("email"),
      formData.get("password"),
      formData.get("passwordVerify"),
      formData.get("username")
    );
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
        <Container component="main">
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
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                        defaultValue={auth.userData ? auth.userData.firstName : ""}
                        autoComplete="fname"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name:"
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
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                        defaultValue={auth.userData ? auth.userData.lastName : ""}
                        required
                        fullWidth
                        variant="standard"
                        id="lastName"
                        label="Last Name:"
                        name="lastName"
                        autoComplete="lname"
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
                        defaultValue={auth.userData ? auth.userData.email : ""}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                        defaultValue={auth.userData ? auth.userData.username : ""}
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        type="username"
                        id="username"
                        autoComplete="username"
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
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
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
                        defaultValue={auth.userData ? auth.userData.passwordVerify : ""}
                        required
                        fullWidth
                        name="passwordVerify"
                        label="Password Verify"
                        type="password"
                        id="passwordVerify"
                        autoComplete="new-password"
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
                    </Box>
                  </Box>
                </Grid>
              </Grid>
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
                Create New Account
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login/" variant="body2">
                    Already have an account? Sign in
                  </Link>
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
        <Container component="main">
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
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
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
                        defaultValue={auth.userData ? auth.userData.firstName : ""}
                        autoComplete="fname"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name:"
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
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
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
                        defaultValue={auth.userData ? auth.userData.lastName : ""}
                        required
                        fullWidth
                        variant="standard"
                        id="lastName"
                        label="Last Name:"
                        name="lastName"
                        autoComplete="lname"
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
                        defaultValue={auth.userData ? auth.userData.email : ""}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                        defaultValue={auth.userData ? auth.userData.username : ""}
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        type="username"
                        id="username"
                        autoComplete="username"
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
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
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
                        defaultValue={auth.userData ? auth.userData.passwordVerify : ""}
                        required
                        fullWidth
                        name="passwordVerify"
                        label="Password Verify"
                        type="password"
                        id="passwordVerify"
                        autoComplete="new-password"
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
                    </Box>
                  </Box>
                </Grid>
              </Grid>
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
                Create New Account
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}
