import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import { MusicContext } from '../../context/MusicContext';
import { createGradient, useColorExtractor } from '../../utils/colorExtractor';
import './Layout.scss';

const Layout = ({ children }) => {
  const { currentSong } = useContext(MusicContext);
  const { dominantColor } = useColorExtractor(currentSong?.thumbnail);
  
  const backgroundStyle = {
    background: createGradient(dominantColor),
    transition: 'background 1s ease'
  };

  return (
    <div className="layout" style={backgroundStyle}>
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={3} lg={2} className="sidebar-container">
            <Sidebar />
          </Col>
          
          {/* Main content */}
          <Col md={5} lg={5} className="content-container">
            <div className="main-content">
              {children}
            </div>
          </Col>
          
          {/* Music player on the right */}
          <Col md={4} lg={5} className="player-sidebar-container">
            {currentSong && <MusicPlayer />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Layout;