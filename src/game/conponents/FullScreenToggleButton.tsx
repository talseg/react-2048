import React from 'react';
import { SmallButton } from '../elements/SmallButton';
import { IconEnterFS } from '../../assets/Icons';

const FullscreenToggleButton: React.FC = () => {
  
  const toggleFullscreen = () => {
    const elem = document.documentElement;

    if (!document.fullscreenElement) {
      elem.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <SmallButton onClick={toggleFullscreen}>
      <IconEnterFS/>
    </SmallButton>
  );
};

export default FullscreenToggleButton;