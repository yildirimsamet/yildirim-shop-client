import Stepper from "../components/Stepper";
import styles from "../styles/payment.module.css";
const payment = () => {
  return (
    <div className={styles.paymentWrapper}>
      <Stepper />
    </div>
  );
};
export default payment;
