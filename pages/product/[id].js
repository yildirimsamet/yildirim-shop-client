import { Button } from "@material-ui/core";
import UserContext from "../../contexts/UserContext";
import styles from "./product.module.css";
import { useContext, useEffect, useState } from "react";
import BasketContext from "../../contexts/BasketContext";
import Link from "next/link";
const SingleProduct = ({ product }) => {
  if (product.success === false) {
    return <h2>Ürün bulunamadı.</h2>;
  }
  const { data } = product;
  const { user } = useContext(UserContext);
  const { basket, setBasket } = useContext(BasketContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    let category;
    if (data.gender == "Kadın") {
      category = "kadin";
    }
    if (data.gender == "Erkek") {
      category = "erkek";
    }
    fetch(process.env.API + `/products/${category}/${data.category}/0`)
      .then((res) => res.json())
      .then((res) => setRelatedProducts(res.data));
  }, []);
  return (
    <>
      <div className={styles.productWrapper}>
        <span style={{ position: "absolute", top: "-35px", left: "0" }}>
          {data.gender + " > " + data.shopName + " > "}{" "}
          <strong>{data.category}</strong>
        </span>
        <div className={styles.productMain}>
          <div className={styles.productMainLeftImages}>
            {data.images.length > 1 &&
              data.images.map((img, i) => {
                return (
                  <img
                    onMouseOver={(e) => {
                      const mainImg = document.getElementById("mainImg");
                      mainImg.src = e.target.src;
                    }}
                    className={styles.leftImgs}
                    key={i}
                    src={img}
                    alt={data.productName}
                  />
                );
              })}
          </div>
          <div className={styles.productsMainMainImg}>
            <img id="mainImg" src={data.images[0]} alt={data.productName} />
          </div>
          <div className={styles.productMainLeftImagesMobile}>
            {data.images.length > 1 &&
              data.images.map((img, i) => {
                return (
                  <img
                    onMouseOver={(e) => {
                      const mainImg = document.getElementById("mainImg");
                      mainImg.src = e.target.src;
                    }}
                    className={styles.leftImgs}
                    key={i}
                    src={img}
                    alt={data.productName}
                  />
                );
              })}
          </div>
          <div className={styles.productsDesc}>
            <div className={styles.productsDescHeader}>
              <h3>{data.productName}</h3>
              <div>
                {data.productScore && parseFloat(data.productScore).toFixed(1)}
                {"/5"}
                <div className={styles.stars}>
                  <span
                    className={styles.score}
                    style={{
                      width: `${
                        parseFloat(data.productScore).toFixed(1) * 20
                      }%`,
                    }}
                  ></span>
                </div>
              </div>
              <div>
                <p>
                  <strong>{data.price}</strong> TL
                </p>
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (!user) {
                      router.push("/register");
                    }
                    const isAlreadyContained = basket.find(
                      (item) => item.itemId === data._id
                    );
                    if (isAlreadyContained !== undefined) {
                      setBasket(
                        basket.map((item) => {
                          if (item.itemId === data._id) {
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
                        {
                          shopName: data.shopName,
                          image: data.images[0],
                          productName: data.productName,
                          price: data.price,
                          count: 1,
                          itemId: data._id,
                        },
                      ]);
                      return;
                    }
                  }}
                >
                  Sepete Ekle
                </Button>
              </div>
            </div>
            <div style={{ marginTop: "50px" }}>
              <h2>Ürün Bilgileri</h2>
              <ul>
                <li>15 gün içinde ücretsiz iade.</li>
                <li>
                  Bu ürün <strong>{data.shopName}</strong> tarafından
                  gönderilecektir.
                </li>
                <li>
                  Bu üründen en fazla 10 adet sipariş verilebilir. 10 adetin
                  üzerindeki siparişleri Yildirim Shop iptal etme hakkını saklı
                  tutar.
                </li>
                <li>
                  İncelemiş olduğunuz ürünün satış fiyatını satıcı
                  belirlemektedir.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomProducts}>
        <h3>İlginizi çekebilecek ürünler</h3>
        <div className={styles.bottomProductsInner}>
          {relatedProducts.map((item, index) => {
            if (index > 5) {
              return;
            }
            return (
              <div key={index} style={{ marginLeft: "12px" }}>
                <Link href={`/product/${item._id}`}>
                  <a>
                    <img
                      className={styles.bottomProductsImgs}
                      src={item.images[0]}
                      alt={item.productName}
                    />
                    <p style={{ fontSize: "14px" }}>
                      <strong>{item.shopName}</strong>{" "}
                      <span>{item.productName}</span>
                    </p>
                    <p>
                      <strong>{item.price} TL</strong>
                    </p>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default SingleProduct;
export const getServerSideProps = async (ctx) => {
  const res = await fetch(
    process.env.API + "/products/findbyid/" + ctx.query.id
  );
  const data = await res.json();

  return {
    props: { product: data },
  };
};
