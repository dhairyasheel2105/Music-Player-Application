import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import MusicList from '../../components/MusicList/MusicList';
import { MusicContext } from '../../context/MusicContext';
import './Favourites.scss';

const Favourites = () => {
  const { favorites } = useContext(MusicContext);
  
  return (
    <div className="favourites-page">
      <Container fluid>
        <h1 className="page-title">Favourites</h1>
        <MusicList songs={favorites} />
      </Container>
    </div>
  );
};

export default Favourites;