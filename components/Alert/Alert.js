import { Alert as MAlert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  alert: {
    margin: "15px 0",
    width: "100%",
  },
});
const Alert = ({ type, children }) => {
  const classes = useStyles();
  return (
    <MAlert className={classes.alert} severity={type}>
      {children}
    </MAlert>
  );
};
export default Alert;
