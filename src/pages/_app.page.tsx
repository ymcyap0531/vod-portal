import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import App, { AppProps } from "next/app";
import Head from "next/head";
import "../i18n/config";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Video on demand</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
