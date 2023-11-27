import * as React from 'react';
import Head from 'next/head';
import { AppProvider } from '../context/AppContext';
import SearchBar from '../features/Search/SearchBar';
import SearchResults from '../features/Search/SearchResults';

const Home: React.FC = () => {
  return (
    <AppProvider>
      <div>
        <Head>
          <title>Mercado Libre Search</title>
          <meta name="description" content="Buscador de productos de Mercado Libre" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Mercado Libre Search</h1>
          <SearchBar />
          <SearchResults />
        </main>

        <footer>
          <p>© {new Date().getFullYear()} Mercado Libre Search</p>
        </footer>
      </div>
    </AppProvider>
  );
};

export default Home;

