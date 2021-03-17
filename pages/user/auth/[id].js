import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Alert from "../../../components/Alert/Alert";
const userAuth = ({ id }) => {
  const router = useRouter();
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    fetch(process.env.API + "/user/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          setAlert({ type: "success", text: res.data });
          setSuccess(true);
          setTimeout(() => {
            router.push("/signin");
          }, 2000);
        } else {
          setAlert({ type: "error", text: res.data });
          setSuccess(false);
          setTimeout(() => {
            router.push("/signin");
          }, 2000);
        }
      });
  }, []);
  return (
    <div>
      {alert && <Alert type={alert.type}>{alert.text}</Alert>}
      {success === true ? (
        <Typography style={{ textAlign: "center" }} variant="h5">
          Giriş sayfasına yönlendiriliyorsunuz...
        </Typography>
      ) : (
        <Typography style={{ textAlign: "center" }} variant="h5">
          Kayıt olma sayfasına yönlendiriliyorsunuz...
        </Typography>
      )}
    </div>
  );
};
export default userAuth;
export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  return {
    props: { id },
  };
};
