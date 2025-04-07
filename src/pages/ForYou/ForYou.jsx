import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar/SearchBar';
import MusicList from '../../components/MusicList/MusicList';
import { MusicContext } from '../../context/MusicContext';
import './ForYou.scss';

const ForYou = () => {
  const { filteredSongs, searchTerm } = useContext(MusicContext);
  
  return (
    <div className="for-you-page">
      <Container fluid>
        <h1 className="page-title">For You</h1>
        <SearchBar />
        <MusicList 
          songs={filteredSongs} 
          title={searchTerm ? 'Search Results' : ''} 
        />
      </Container>
    </div>
  );
};

export default ForYou;