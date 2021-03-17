import styles from "./ProductCard.module.css";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BasketContext from "../../contexts/BasketContext";
import { useContext } from "react";
import ProductContext from "../../contexts/ProductContext";
const ProductCard = ({
  image,
  productName,
  shopName,
  productScore,
  price,
  freeCargo,
  rushDelivery,
  imagePlaceHolder,
  itemId,
}) => {
  const { setCurrentApi } = useContext(ProductContext);
  const { basket, setBasket } = useContext(BasketContext);
  return (
    <div className={styles.cardWrapper}>
      {freeCargo && (
        <div className={styles.cargoBadge}>
          Ücretsiz <br /> Kargo
        </div>
      )}
      {rushDelivery && (
        <div className={styles.rushBadge}>
          24 Saatte <br />
          Kargoda
        </div>
      )}
      <Link href={`/product/${itemId}`}>
        <a>
          <div className={styles.zoom}>
            {/* <span
              onClick={() => {
                fetch(process.env.API + "/products/deletebyid", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ id: itemId }),
                });
              }}
              className={styles.delIcon}
            >
              X
            </span> */}
            <LazyLoadImage
              onError={(e) => {
                e.target.src = imagePlaceHolder;
              }}
              className={styles.productImg}
              src={image}
              alt={productName}
            />
          </div>
        </a>
      </Link>

      <div className={styles.productHeader}>
        <strong
          onClick={() => {
            setCurrentApi(process.env.API + `/products/brand/${shopName}/`);
          }}
          style={{ cursor: "pointer", color: "var(--blue)" }}
        >
          {shopName}
        </strong>

        <p>{productName}</p>
      </div>
      <div>
        {productScore && parseFloat(productScore).toFixed(1)}
        {"/5"}
        <div className={styles.stars}>
          <span
            className={styles.score}
            style={{ width: `${parseFloat(productScore).toFixed(1) * 20}%` }}
          ></span>
        </div>
      </div>
      <div>
        <p>{price}TL</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "5px",
        }}
      >
        <Button
          onClick={() => {
            const isAlreadyContained = basket.find(
              (item) => item.itemId === itemId
            );
            if (isAlreadyContained !== undefined) {
              setBasket(
                basket.map((item) => {
                  if (item.itemId === itemId) {
                    return { ...item, count: item.count + 1 };
                  } else {
                    return item;
                  }
                })
              );
              return;
            } else {
              setBasket([
                ...basket,
                { shopName, image, productName, price, count: 1, itemId },
              ]);
              return;
            }
          }}
          color="primary"
          variant="contained"
        >
          Sepete Ekle
        </Button>
        <Link href={`/product/${itemId}`}>
          <a>
            <Button variant="outlined" color="primary">
              Ürüne Git
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};
export default ProductCard;
