import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import jwt from "jsonwebtoken";
import UserContext from "../contexts/UserContext";
import { useRouter } from "next/router";
import Alert from "../components/Alert/Alert";
import Loader from "../components/Loader/Loader";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState(null);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        {alert && <Alert type={alert.type}>{alert.text}</Alert>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch(process.env.API + "/user/signin", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.success === true) {
                  const user = jwt.decode(res.token);
                  if (remember) {
                    localStorage.setItem("token", res.token);
                  }

                  setAlert({
                    type: "success",
                    text: "Başarılı giriş. Anasayfaya yönlendiriliyorsunuz.",
                  });
                  setTimeout(() => {
                    setAlert(null);
                    setUser(user);
                    router.push("/");
                  }, 1000);
                }
                if (res.success === false) {
                  setAlert({ type: "error", text: res.data });
                  setTimeout(() => {
                    setAlert(null);
                  }, 1500);
                }
              });
          }}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormControlLabel
            onChange={(e) => {
              if (e.target.checked) {
                setRemember(true);
              } else {
                setRemember(false);
              }
            }}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {alert ? <Loader /> : "Giriş Yap"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
