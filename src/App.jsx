import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MusicProvider } from './context/MusicContext';
import Layout from './components/Layout/Layout';
import ForYou from './pages/ForYou/ForYou';
import TopTracks from './pages/TopTracks/TopTracks';
import Favourites from './pages/Favourites/Favourites';
import RecentlyPlayed from './pages/RecentlyPlayed/RecentlyPlayed';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <MusicProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ForYou />} />
            <Route path="/top-tracks" element={<TopTracks />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/recently-played" element={<RecentlyPlayed />} />
          </Routes>
        </Layout>
      </Router>
    </MusicProvider>
  );
}

export default App;