import { Grid, Typography } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import ProductContext from "../contexts/ProductContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "react-loading-components";
import Aside from "../components/Aside/Aside";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  infScroll: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    justifyContent: "space-evenly",
  },
  "@media screen and (max-width:700px)": {
    container: {
      flexDirection: "column",
    },
    infScroll: {
      marginTop: "55px",
    },
  },
});
export default function Home() {
  const classes = useStyles();
  const {
    products,
    setProducts,
    page,
    setPage,
    currentApi,
    hasMoreItems,
    setHasMoreItems,
    currentCategory,
  } = useContext(ProductContext);
  const fetchMoreData = async () => {
    fetch(currentApi + (page + 1))
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length <= 11) {
          setHasMoreItems(false);
        }
        setProducts([...products, ...res.data]);
        setPage(page + 1);
      });
  };

  return (
    <>
      <Grid
        className={classes.container}
        style={{ transition: ".2s ease all" }}
        id="indexGrid"
        container
      >
        <Grid item md={2}>
          <Aside />
        </Grid>
        <Grid item md={10}>
          <InfiniteScroll
            className={classes.infScroll}
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMoreItems}
            loader={
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  minWidth: "500px",
                }}
              >
                <Loading
                  type="three_dots"
                  width={70}
                  height={70}
                  fill="#f44242"
                />
              </div>
            }
          >
            {products.map((item) => {
              return (
                <ProductCard
                  itemId={item._id}
                  key={item._id}
                  image={item.images[0]}
                  productName={item.productName}
                  shopName={item.shopName}
                  productScore={item.productScore}
                  price={item.price}
                  rushDelivery={item.rushDelivery}
                  freeCargo={item.freeCargo}
                  imagePlaceHolder={item.imagePlaceHolder}
                />
              );
            })}
          </InfiniteScroll>
        </Grid>
      </Grid>
    </>
  );
}
