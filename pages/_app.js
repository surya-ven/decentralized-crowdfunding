import "../styles/globals.css";
import Layout from "../components/layout";
import Nav from "../components/nav";

function App({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default App;
