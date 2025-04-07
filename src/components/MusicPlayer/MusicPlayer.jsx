import React, { useContext, useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlay, faPause, faStepForward, faStepBackward, 
  faVolumeUp, faVolumeMute, faEllipsisH, faHeart
} from '@fortawesome/free-solid-svg-icons';
import { MusicContext } from '../../context/MusicContext';
import './MusicPlayer.scss';

const MusicPlayer = () => {
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    playNext, 
    playPrevious,
    audioRef,
    toggleFavorite,
    isFavorite
  } = useContext(MusicContext);
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const progressBarRef = useRef(null);
  
  // Check if current song is favorited
  const favorited = currentSong ? isFavorite(currentSong.id) : false;
  
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const updateDuration = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      playNext();
    };
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioRef, playNext]);
  
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted, audioRef]);
  
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };
  
  // const handleVolumeChange = (e) => {
  //   const newVolume = parseFloat(e.target.value);
  //   setVolume(newVolume);
  //   if (newVolume === 0) {
  //     setIsMuted(true);
  //   } else {
  //     setIsMuted(false);
  //   }
  // };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };
  
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(currentSong);
    setShowDropdown(false);
  };
  
  if (!currentSong) return null;
  
  
return (
  <div className="music-player">
    {/* Song info and album art */}
    <div className="song-info-container">
      <h2 className="song-title">{currentSong.title}</h2>
      <p className="artist-name">{currentSong.artistName}</p>
      
      <div className="album-art-container">
        <img 
          src={currentSong.thumbnail} 
          alt={currentSong.title} 
          className="album-art" 
        />
      </div>
    </div>
    
    {/* Progress bar */}
    <div className="progress-container">
      <input
        type="range"
        className="progress-bar"
        ref={progressBarRef}
        min={0}
        max={duration || 100}
        value={currentTime}
        onChange={handleProgressChange}
      />
      <div className="time-display">
        <span className="time">{formatTime(currentTime)}</span>
        <span className="time">{formatTime(duration)}</span>
      </div>
    </div>
    
    {/* Controls */}
    <div className="controls">
      <Dropdown 
        className="options-dropdown" 
        onToggle={handleDropdownToggle}
        show={showDropdown}
      >
        <Dropdown.Toggle as="button" className="control-button options-button">
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
      <button className="control-button" onClick={playPrevious}>
        <FontAwesomeIcon icon={faStepBackward} />
      </button>
      <button className="control-button play-button" onClick={togglePlay}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>
      <button className="control-button" onClick={playNext}>
        <FontAwesomeIcon icon={faStepForward} />
      </button>
      <button className="control-button volume-button" onClick={toggleMute}>
        <FontAwesomeIcon icon={isMuted || volume === 0 ? faVolumeMute : faVolumeUp} />
      </button>
    </div>
  </div>
);

};

export default MusicPlayer;