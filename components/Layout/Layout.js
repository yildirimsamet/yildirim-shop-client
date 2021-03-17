import { Container, Typography } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import { makeStyles } from "@material-ui/core";
import UserContext from "../../contexts/UserContext";
import BasketContext from "../../contexts/BasketContext";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import ProductContext from "../../contexts/ProductContext";
const useStyles = makeStyles(() => ({
  appWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "0",
    overflow: "hidden",
  },
  footer: {
    justifySelf: "flex-end",
    color: "var(--grey)",
    textAlign: "center",
    marginTop: "auto",
  },
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="/">
        <a>yildirimshop.com</a>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Layout = ({ children, style }) => {
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("kadin");
  const [currentApi, setCurrentApi] = useState(
    process.env.API + "/products/pagination/"
  );
  useEffect(() => {
    fetch(currentApi + page)
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length <= 11) {
          setHasMoreItems(false);
        }
        if (res.success === true) {
          setProducts(res.data);
        }
      });
  }, [currentApi]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const user = jwt.decode(localStorage.getItem("token"));
      setUser(user);
    }
  }, []);
  const classes = useStyles();
  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      <ProductContext.Provider
        value={{
          products,
          setProducts,
          page,
          setPage,
          currentApi,
          setCurrentApi,
          hasMoreItems,
          setHasMoreItems,
          categories,
          setCategories,
          currentCategory,
          setCurrentCategory,
        }}
      >
        <UserContext.Provider value={{ user, setUser }}>
          <Container className={classes.appWrapper} maxWidth="lg">
            <Navbar />
            <main style={style}>{children}</main>
            <footer className={classes.footer}>
              <Copyright />
            </footer>
          </Container>
        </UserContext.Provider>
      </ProductContext.Provider>
    </BasketContext.Provider>
  );
};
export default Layout;
