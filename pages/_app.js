import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import Popup from "../components/Popup/Popup";
import { useState } from "react";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const [cantGo, setCantGo] = useState(true);
  return (
    <React.Fragment>
      <Head>
        <title>Yildirim Shop</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Popup setCantGo={setCantGo} />
        <Layout
          style={
            cantGo
              ? {
                  opacity: "0.5",
                  filter: "blur(1px)",
                  pointerEvents: "none",
                  height: "90vh",
                  overflow: "hidden",
                }
              : {}
          }
        >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
