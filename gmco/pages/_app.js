import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { UserContextProvider } from "../components/utility/UserContext";
import { PlaylistContextProvider } from "../components/utility/PlaylistContext";
import { EditingContextProvider } from "../components/utility/EditContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <UserContextProvider>
        <PlaylistContextProvider>
          <EditingContextProvider>
            <Component {...pageProps} />
          </EditingContextProvider>
        </PlaylistContextProvider>
      </UserContextProvider>
    </>
  );
}

export default MyApp;
