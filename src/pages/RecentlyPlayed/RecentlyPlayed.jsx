import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import MusicList from '../../components/MusicList/MusicList';
import { MusicContext } from '../../context/MusicContext';
import './RecentlyPlayed.scss';

const RecentlyPlayed = () => {
  const { recentlyPlayed } = useContext(MusicContext);
  
  return (
    <div className="recently-played-page">
      <Container fluid>
        <h1 className="page-title">Recently Played</h1>
        <MusicList songs={recentlyPlayed} />
      </Container>
    </div>
  );
};

export default RecentlyPlayed;