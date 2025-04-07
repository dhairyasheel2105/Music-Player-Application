import React, { useContext, useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faEllipsisH, faHeart } from '@fortawesome/free-solid-svg-icons';
import { MusicContext } from '../../context/MusicContext';
import './MusicItem.scss';

const MusicItem = ({ song }) => {
  const { 
    currentSong, 
    isPlaying, 
    playSong, 
    togglePlay, 
    toggleFavorite, 
    isFavorite 
  } = useContext(MusicContext);
  
  const [showDropdown, setShowDropdown] = useState(false);
  
  const isActive = currentSong && currentSong.id === song.id;
  const favorited = isFavorite(song.id);
  
  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (isActive) {
      togglePlay();
    } else {
      playSong(song);
    }
  };
  
  const handleItemClick = () => {
    if (!showDropdown) {
      if (isActive) {
        togglePlay();
      } else {
        playSong(song);
      }
    }
  };
  
  // Simplified dropdown toggle handler
  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };
  
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(song);
    setShowDropdown(false);
  };
  
  return (
    <div 
      className={`music-item ${isActive ? 'active' : ''}`} 
      onClick={handleItemClick}
    >
      <Row className="align-items-center">
        <Col xs={1} className="play-icon-container">
          <button className="play-button" onClick={handlePlayClick}>
            <FontAwesomeIcon 
              icon={isActive && isPlaying ? faPause : faPlay} 
              className="play-icon" 
            />
          </button>
        </Col>
        <Col xs={2} sm={1}>
          <img 
            src={song.thumbnail} 
            alt={song.title} 
            className="thumbnail" 
          />
        </Col>
        <Col xs={7} sm={8}>
          <div className="song-info">
            <div className="song-title">{song.title}</div>
            <div className="artist-name">{song.artistName}</div>
          </div>
        </Col>
        <Col xs={2} className="text-right">
          <div className="duration">{song.duration}</div>
          <Dropdown 
            className="options-dropdown" 
            onClick={handleDropdownClick}
            onToggle={handleDropdownToggle}
            show={showDropdown}
          >
            <Dropdown.Toggle variant="link" id={`dropdown-${song.id}`} className="dropdown-toggle">
              <FontAwesomeIcon icon={faEllipsisH} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item 
                onClick={handleFavoriteClick}
                className={favorited ? 'favorited' : ''}
              >
                <FontAwesomeIcon icon={faHeart} /> 
                {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default MusicItem;