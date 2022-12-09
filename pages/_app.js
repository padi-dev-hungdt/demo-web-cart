import Layout from '../components/Layout';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useState } from 'react';

export const themeContext = createContext();

function MyApp({ Component, pageProps }) {
  const [isLoad, setIsLoad] = useState(true);
  return (
    <themeContext.Provider value={{ isLoad: isLoad, setIsLoad: setIsLoad }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </themeContext.Provider>
  );
}

export default MyApp;
