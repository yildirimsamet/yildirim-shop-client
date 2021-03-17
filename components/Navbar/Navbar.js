import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { useRouter } from "next/router";
import {
  Badge,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import {
  CardGiftcard,
  ShoppingCart,
  AccountCircle,
  Store,
  Help,
  ExitToApp,
} from "@material-ui/icons";
import BasketContext from "../../contexts/BasketContext";
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    letterSpacing: theme.spacing(0.3),
  },
  basketMenu: {
    position: "absolute",
    zIndex: "99",
    background: "white",
    top: "65px",
    right: "-605px",
    padding: "15px 25px ",
    width: "600px",
    boxShadow: "0 2px 4px lightgrey",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    color: "black",
    transition: ".3s ease all",
  },
  userMenu: {
    position: "absolute",
    zIndex: "100",
    background: "white",
    top: "65px",
    right: "-205px",
    padding: "15px 25px ",
    width: "200px",
    boxShadow: "0 2px 4px lightgrey",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    color: "black",
    transition: ".3s ease all",
  },
  userMenuRow: {
    display: "flex",
    alignItems: "center",
    padding: "5px 0",
    "&:hover": {
      color: "var(--blue)",
    },
  },
  userMenuIcon: {
    marginBottom: "2px",
    marginRight: "8px",
  },
  userMenuEmail: {
    paddingBottom: "15px",
    fontWeight: "bold",
  },
  toolbar: {
    position: "relative",
  },
  basketMenuImg: {
    height: "75px",
  },
  basketMenuRow: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "5px 0",
    borderBottom: "1px solid lightgrey",
    "& p": {
      margin: "2px",
    },
    "& h3": {
      margin: "0",
      marginBottom: "5px",
    },
  },
  basketMenuRowRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  payButton: {
    background: "#2da139",

    color: "white",
    transition: ".2s ease all",
    "&:hover": {
      background: "#37b844",
    },
  },
  remove: {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    color: "red",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    zIndex: "10",
  },
  basketProducts: {
    maxHeight: "450px",
    overflowY: "scroll",
  },
  "@media screen and (max-width:700px)": {
    basketMenu: {
      width: "100%",
    },
    basketProducts: {
      maxHeight: "270px",
    },
    title: {
      fontSize: "14px",
    },
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const { basket, setBasket } = useContext(BasketContext);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [basketLength, setBasketLength] = useState(basket.length);
  const [basketMenuOpened, setBasketMenuOpened] = useState(false);
  const router = useRouter();
  const TotalPrice = () => {
    let total = 0;
    basket.forEach((item) => {
      total = total + parseInt(item.price) * parseInt(item.count);
    });
    return total;
  };
  useEffect(() => {
    const indexEl = document.getElementById("indexGrid");
    if (basketMenuOpened) {
      try {
        indexEl.style.filter = "blur(1px)";
        indexEl.style.opacity = ".7";
      } catch (error) {}
    } else {
      try {
        indexEl.style.filter = "blur(0px)";
        indexEl.style.opacity = "1";
      } catch (error) {}
    }
  }, [basketMenuOpened]);
  useEffect(() => {
    setBasketLength(basket.length);
  }, [basket]);
  useEffect(() => {
    try {
      const userMenuEl = document.getElementById("userMenu");

      if (userMenuOpened) {
        userMenuEl.style.right = "2px";
      } else {
        userMenuEl.style.right = "-205px";
      }
    } catch (error) {}
  }, [userMenuOpened]);
  useEffect(() => {
    try {
      const basketMenuEl = document.getElementById("basketMenu");

      if (basketMenuOpened) {
        basketMenuEl.style.right = "2px";
      } else {
        basketMenuEl.style.right = "-605px";
      }
    } catch (error) {}
  }, [basketMenuOpened]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Store className={classes.menuButton} />
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a>Yildirim Shop</a>
            </Link>
          </Typography>
          <div id="basketMenu" className={classes.basketMenu}>
            {basket.length > 0 ? (
              <>
                <div className={classes.basketProducts}>
                  {basket.map((item, index) => {
                    return (
                      <div key={index} className={classes.basketMenuRow}>
                        <span
                          onClick={() => {
                            setBasket(
                              basket.filter((it) => it.itemId !== item.itemId)
                            );
                          }}
                          className={classes.remove}
                        >
                          X
                        </span>
                        <img
                          className={classes.basketMenuImg}
                          src={item.image}
                          alt={item.productName}
                        />
                        <div
                          style={{
                            flex: 1,
                            textAlign: "left",
                            paddingLeft: "25px",
                          }}
                          className={classes.basketMenuRowRight}
                        >
                          <h3>{item.productName}</h3>
                          <p>
                            <strong>{item.shopName}</strong>
                          </p>
                          <p>
                            <strong>{item.price}</strong> TL
                          </p>
                          <p>{item.count} Adet</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <span>
                    Toplam fiyat : <strong>{TotalPrice()}</strong> TL
                  </span>
                  <Button
                    onClick={() => {
                      if (!user) {
                        router.push("/register");
                        setBasketMenuOpened(false);
                      }
                    }}
                    className={classes.payButton}
                    variant="contained"
                  >
                    Ödemeye geç
                  </Button>
                </div>
              </>
            ) : (
              <p>Sepetinizde ürün bulunmuyor.</p>
            )}
          </div>
          {user ? (
            <>
              <div id="userMenu" className={classes.userMenu}>
                {/* <div className={classes.userMenuEmail}>{user.email}</div> */}
                <div>
                  <Link href="/">
                    <a className={classes.userMenuRow}>
                      <CardGiftcard className={classes.userMenuIcon} />
                      <span>Siparişlerim</span>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a className={classes.userMenuRow}>
                      <AccountCircle className={classes.userMenuIcon} />
                      <span>Kullanıcı Bilgilerim</span>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a className={classes.userMenuRow}>
                      <Help className={classes.userMenuIcon} />
                      <span>Yardım</span>
                    </a>
                  </Link>
                </div>
                <div>
                  <Link href="/">
                    <a
                      onClick={() => {
                        setUser(null);
                        localStorage.removeItem("token");
                      }}
                      className={classes.userMenuIcon}
                      className={classes.userMenuRow}
                    >
                      <ExitToApp />
                      <span>Çıkış Yap</span>
                    </a>
                  </Link>
                </div>
              </div>
              <IconButton
                onClick={() => {
                  if (userMenuOpened) {
                    setUserMenuOpened(false);
                  }
                  setBasketMenuOpened(!basketMenuOpened);
                }}
                color="inherit"
              >
                <Badge badgeContent={basketLength} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton
                onClick={() => {
                  if (basketMenuOpened) {
                    setBasketMenuOpened(false);
                  }
                  setUserMenuOpened(!userMenuOpened);
                }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                onClick={() => {
                  if (userMenuOpened) {
                    setUserMenuOpened(false);
                  }
                  setBasketMenuOpened(!basketMenuOpened);
                }}
                color="inherit"
              >
                <Badge badgeContent={basketLength} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <Link href="/signin">
                <Button color="inherit">
                  <a>Giriş</a>
                </Button>
              </Link>
              <Link href="/register">
                <Button color="inherit">
                  <a>Üye Ol</a>
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
