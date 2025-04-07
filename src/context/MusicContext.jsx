import React, { createContext, useState, useEffect, useRef } from 'react';
import musicData from '../data/musicData';
import { getFavorites, setFavorites, getRecentlyPlayed, setRecentlyPlayed } from '../utils/storageUtils';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs] = useState(musicData); // Removed setSongs since it's not used
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavoritesList] = useState([]);
  const [recentlyPlayed, setRecentlyPlayedList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const audioRef = useRef(new Audio());

  // Load favorites and recently played from storage
  useEffect(() => {
    const storedFavorites = getFavorites();
    const storedRecentlyPlayed = getRecentlyPlayed();
    
    if (storedFavorites) setFavoritesList(storedFavorites);
    if (storedRecentlyPlayed) setRecentlyPlayedList(storedRecentlyPlayed);
    
    // Set the first song as current if none is selected
    if (!currentSong && songs.length > 0) {
      setCurrentSong(songs[0]);
    }
  }, [songs, currentSong]); // Added missing dependencies

  // Handle audio play/pause
  useEffect(() => {
    if (currentSong) {
      const audio = audioRef.current; // Store ref in a variable for cleanup
      audio.src = currentSong.musicUrl;
      
      if (isPlaying) {
        audio.play().catch(error => console.error("Audio play error:", error));
      } else {
        audio.pause();
      }
      
      return () => {
        audio.pause(); // Use the stored variable in cleanup
      };
    }
  }, [currentSong, isPlaying]);

  // Filter songs based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artistName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchTerm, songs]);

  // Rest of your code remains unchanged
  const playSong = (song) => {
    // Add to recently played
    const updatedRecentlyPlayed = [song, ...recentlyPlayed.filter(s => s.id !== song.id)].slice(0, 10);
    setRecentlyPlayedList(updatedRecentlyPlayed);
    setRecentlyPlayed(updatedRecentlyPlayed);
    
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  const playPrevious = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  const toggleFavorite = (song) => {
    const isFavorited = favorites.some(fav => fav.id === song.id);
    let updatedFavorites;
    
    if (isFavorited) {
      updatedFavorites = favorites.filter(fav => fav.id !== song.id);
    } else {
      updatedFavorites = [...favorites, song];
    }
    
    setFavoritesList(updatedFavorites);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (songId) => {
    return favorites.some(fav => fav.id === songId);
  };

  // Get top tracks (could be based on play count or other metrics)
  const getTopTracks = () => {
    // For now, just return all songs, but you could implement logic
    // to sort by play count or other metrics
    return songs;
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        filteredSongs,
        currentSong,
        isPlaying,
        favorites,
        recentlyPlayed,
        searchTerm,
        setSearchTerm,
        playSong,
        togglePlay,
        playNext,
        playPrevious,
        toggleFavorite,
        isFavorite,
        audioRef,
        getTopTracks
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export default MusicProvider;