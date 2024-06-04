import "@/styles/globals.css";
import Layout from "./Components/Layout";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, session,...pageProps }) {
  return (<SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </SessionProvider>)
}
