import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "../components/Alert/Alert";
import { useRouter } from "next/router";

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
    width: "100%",
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const router = useRouter();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [surname, setSurname] = useState("");
  const [alert, setAlert] = useState(null);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kayıt Ol
        </Typography>
        {alert && <Alert type={alert.type}>{alert.text}</Alert>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetch(process.env.API + "/user/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
                number,
                address,
                name,
                surname,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                if (res.success === false) {
                  setAlert({ type: "error", text: res.data });
                  setTimeout(() => {
                    setAlert(null);
                  }, 2500);
                  return;
                }
                if (res.success === true) {
                  setAlert({
                    type: "success",
                    text: "Başarılı. Lütfen gelen maili onaylayın.",
                  });
                  setTimeout(() => {
                    setAlert(null);
                    router.push("/");
                  }, 2000);
                }
              });
          }}
          className={classes.form}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="İsim"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Soyisim"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                id="adres"
                label="Adres (En az 15 karekter)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={number}
                onFocus={(e) => {
                  setNumber("+90");
                }}
                onChange={(e) => {
                  if (e.target.value.length >= 14) {
                    return;
                  }
                  setNumber(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                id="number"
                label="Telefon no"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Adres"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Parola (En az 6 karekter)"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Kayıt Ol
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Hesabınız var mı? Giriş Yap
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
