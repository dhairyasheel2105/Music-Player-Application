export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites from localStorage:', error);
    return [];
  }
};

export const setFavorites = (favorites) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error setting favorites in localStorage:', error);
  }
};

export const getRecentlyPlayed = () => {
  try {
    const recentlyPlayed = sessionStorage.getItem('recentlyPlayed');
    return recentlyPlayed ? JSON.parse(recentlyPlayed) : [];
  } catch (error) {
    console.error('Error getting recently played from sessionStorage:', error);
    return [];
  }
};

export const setRecentlyPlayed = (recentlyPlayed) => {
  try {
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  } catch (error) {
    console.error('Error setting recently played in sessionStorage:', error);
  }
};