import React, { useState } from 'react';

const FullscreenToggle: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const toggleFullscreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <button onClick={toggleFullscreen} style={{
      position: 'fixed',
      left: 20,
      top: 20,
      padding: '10px 16px',
      fontSize: '16px',
      borderRadius: '8px',
      background: '#fff',
      border: '2px black',
      boxShadow: '0 0 6px rgba(0,0,0,0.3)'
    }}>
      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </button>
  );
};

export default FullscreenToggle;