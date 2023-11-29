import * as React from 'react';
import Head from 'next/head';
import { AppProvider } from '../context/AppContext';
import Search from '../features/Search/SearchIndex';

const Home: React.FC = () => {
  return (
    <AppProvider>
      <div>
        <Head>
          <title>Mercado Libre Search</title>
          <meta name="description" content="Buscador de productos de Mercado Libre" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Search />

        <footer>
          <p>© {new Date().getFullYear()} Mercado Libre Challenge</p>
        </footer>
      </div>
    </AppProvider>
  );
};

export default Home;

