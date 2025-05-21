import "@/styles/custom-antd.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";

import CheckSession from "@/components/auth/check-session";
// import { frontendConfig } from "@/libs/vendor/supertokens/frontendConfig";
import withTheme from "@/theme";
import { RecoilRoot } from "recoil";

const reactQueryClient = new QueryClient();

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  // SuperTokensReact.init(frontendConfig());
}

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#001529" />
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
        />
        <link
          rel="shortcut icon"
          href="/favicons/Favicon16.png"
          type="image/x-icon"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/Favicon114.png"
        />
        <link rel="icon" sizes="192x192" href="/favicons/Favicon57.png" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/Favicon72.png"
        />
      </Head>

      
        <RecoilRoot>
            <Component {...pageProps} />
        </RecoilRoot>
    </>
  );
}

export default withTheme(App);
