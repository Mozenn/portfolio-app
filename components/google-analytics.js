import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { logPageView } from "../lib/google-analytics";

const GoogleAnalytics = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      logPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      {process.env.NODE_ENV === "production" && process.browser ? (
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
          ></script>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());

                gtag("config", "${process.env.NEXT_PUBLIC_MEASUREMENT_ID}");`,
            }}
          />
        </Head>
      ) : null}
    </>
  );
};

export default GoogleAnalytics;
