import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/orders.module.css";
const orders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(process.env.API + "/user/getOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id }),
      })
        .then((res) => res.json())
        .then((res) => {
          setOrders(res.data);
        });
    }
  }, [user]);
  let totalPrice = 0;

  return (
    <div>
      {orders.map((order, index) => {
        order.map(
          (item) =>
            (totalPrice += parseInt(item.count) * parseInt(item.product.price))
        );

        return (
          <div className={styles.orderWrapper} key={index + 1000}>
            {order.map((item, index) => {
              return (
                <div className={styles.singleProduct} key={index}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.productName}
                  />
                  <div className={styles.singleProductRight}>
                    <p>
                      <strong>{item.product.productName}</strong>
                    </p>
                    <p>{item.count + " Ad"}</p>
                    <p>{item.product.price} TL</p>
                  </div>
                </div>
              );
            })}
            <p>Toplam fiyat: {totalPrice} TL</p>
          </div>
        );
      })}
    </div>
  );
};
export default orders;
