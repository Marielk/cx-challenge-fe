import * as React from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
 
const Search: React.FC = () => {
  return (
  <main>
    <SearchBar />
    <SearchResults />
  </main>  );
}
 
export default Search;