import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import MusicList from '../../components/MusicList/MusicList';
import { MusicContext } from '../../context/MusicContext';
import './TopTracks.scss';

const TopTracks = () => {
  const { songs } = useContext(MusicContext);
  
  return (
    <div className="top-tracks-page">
      <Container fluid>
        <h1 className="page-title">Top Tracks</h1>
        <MusicList songs={songs} />
      </Container>
    </div>
  );
};

export default TopTracks;