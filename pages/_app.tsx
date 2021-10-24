import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";

type NextPageWithAuth = NextPage & {
  auth: boolean;
};

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayoutAndAuth = AppProps & {
  Component: NextPageWithLayout & NextPageWithAuth;
};

function MyApp({ Component, pageProps }: AppPropsWithLayoutAndAuth) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        {Component.auth ? (
          <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>{" "}
    </SessionProvider>
  );
}
export default MyApp;

function Auth({ children }: any) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isUser = !!session?.user;

  React.useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) router.push("/login"); // If not authenticated, return to login
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
