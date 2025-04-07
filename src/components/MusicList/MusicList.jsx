import React from 'react';
import { Container } from 'react-bootstrap';
import MusicItem from '../MusicItem/MusicItem';
import './MusicList.scss';

const MusicList = ({ songs, title }) => {
  return (
    <div className="music-list">
      {title && <h2 className="list-title">{title}</h2>}
      <Container fluid className="p-0">
        {songs.length > 0 ? (
          songs.map(song => (
            <MusicItem key={song.id} song={song} />
          ))
        ) : (
          <div className="no-songs">No songs found</div>
        )}
      </Container>
    </div>
  );
};

export default MusicList;