import { ApolloProvider } from "@apollo/client";
import { useMeQuery } from "generated/graphql";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { ToastProvider } from "react-toast-notifications";
import NavBar from "../components/NavBar";
import { useApollo } from "../lib/useApollo";
import "../styles/globals.css";
const navbarHidden = ["/createBusiness"];
import splitbee from "@splitbee/web";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
moment.locale("fr");

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const { data, loading, error } = useMeQuery({
    client: apolloClient,
  });
  useEffect(() => {
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    });
    if (data?.me) {
      splitbee.user.set({
        email: data?.me?.email,
        id: data?.me?.id,
        business: data?.me?.business?.name,
      });
    }
  }, [data]);
  if (loading) return <NavBar pages={[]} me={data?.me} />;
  let pages = [
    {
      name: "Mon établissement",
      path: "/business",
    },
  ];
  if (data?.me?.business?.isValidated === true) {
    pages.push({
      name: "Dashboard",
      path: "/",
    });
    pages.push({
      name: "Mes offres",
      path: "/offer",
    });
    pages.push({
      name: "Coupons vendus",
      path: "/coupon",
    });
  }
  return (
    <>
      <Head>
        <title>Espace Pro | OFLO</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="relative">
        {data?.me && !navbarHidden?.includes(router?.pathname) && (
          <NavBar pages={pages} me={data?.me} />
        )}
        <ApolloProvider client={apolloClient}>
          <ToastProvider placement="top-right" autoDismiss={true}>
            <Component {...pageProps} me={data?.me} />
          </ToastProvider>
          <Toaster position="top-right" />
        </ApolloProvider>
      </div>
    </>
  );
}

export default MyApp;
