import styles from "./Aside.module.css";
import { Button } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProductContext from "../../contexts/ProductContext";
const useStyles = makeStyles({
  button: {
    padding: "5px",
  },

  categoryMan: {
    color: "#8c8bc9",
    cursor: "pointer",
    opacity: ".85",
    transition: ".2s ease all",
    "&:hover": {
      opacity: "1",
      color: "blue",
    },
  },
  categoryWoman: {
    color: "#cc8d8d",
    cursor: "pointer",
    opacity: ".85",
    transition: ".2s ease all",
    "&:hover": {
      opacity: "1",
      color: "red",
    },
  },
  "@media screen and (max-width:700px)": {
    buttonsDiv: {
      width: "100%",
      textAlign: "center",
    },
    asideWrapper: {
      width: "100%",
      position: "relative",
    },
  },
});
const Aside = () => {
  const {
    setCurrentApi,
    setPage,
    setHasMoreItems,
    categories,
    setCategories,
    currentCategory,
    setCurrentCategory,
  } = useContext(ProductContext);

  const classes = useStyles();

  const scrollTop = (e) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    e.target.parentElement.parentElement.lastChild.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const fetchWomanCategories = async () => {
    fetch(process.env.API + "/products/kadin/kategoriler")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data);
      });
  };
  const fetchManCategories = async () => {
    fetch(process.env.API + "/products/erkek/kategoriler")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data);
      });
  };

  useEffect(() => {
    fetch(process.env.API + "/products/kadin/kategoriler")
      .then((res) => res.json())
      .then((res) => {
        setCategories(res.data);
        setCurrentCategory("kadin");
      });
  }, []);
  return (
    <div className={styles.asideWrapper}>
      <div className={classes.buttonsDiv}>
        <div>
          <Button
            className={classes.button}
            onClick={(e) => {
              setPage(0);
              setCurrentApi(process.env.API + "/products/kadin/pagination/");
              fetchWomanCategories();
              setHasMoreItems(true);
              scrollTop(e);
              setCurrentCategory("kadin");
            }}
            variant={currentCategory === "kadin" ? "outlined" : "text"}
            color="secondary"
          >
            Kadın
          </Button>

          <Button
            className={classes.button}
            variant={currentCategory === "erkek" ? "outlined" : "text"}
            onClick={(e) => {
              setPage(0);
              setHasMoreItems(true);
              setCurrentApi(process.env.API + "/products/erkek/pagination/");
              fetchManCategories();
              scrollTop(e);
              setCurrentCategory("erkek");
            }}
            color="primary"
          >
            Erkek
          </Button>

          <div style={{ marginTop: "5px" }} className={styles.categoryList}>
            {categories.map((category, index) => (
              <p
                onClick={(e) => {
                  setPage(0);
                  setHasMoreItems(true);
                  setCurrentApi(
                    process.env.API +
                      `/products/${currentCategory}/${category}/`
                  );
                }}
                className={
                  currentCategory === "kadin"
                    ? classes.categoryWoman
                    : classes.categoryMan
                }
                key={index}
              >
                <span>{category}</span>
              </p>
            ))}
          </div>
        </div>
        {/* <div style={{ marginTop: "15px" }}>
          <div className={styles.categoryList}>
            {womanCategories.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default Aside;
