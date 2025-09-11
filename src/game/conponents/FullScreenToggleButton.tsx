import React from 'react';
import { SmallButton } from '../elements/SmallButton';


export const IconEnterFS = () => (
  <svg width="30" height="30" viewBox="0 0 14 14" fill="none"
       stroke="currentColor" strokeWidth="1.5" 
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5V3H5" />
    <path d="M11 5V3H9" />
    <path d="M3 9V11H5" />
    <path d="M11 9V11H9" />
  </svg>
);

export const IconRestart = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-3-6.7L21 7" />
    <path d="M21 3v4h-4" />
  </svg>
);

export const IconUndo = () => (
  <svg
    viewBox="0 0 24 24"
    width="26"
    height="26"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M3 7v6h6" />
    <path d="M21 17a9 9 0 0 0-9-9H9" />
  </svg>
);

const FullscreenToggle: React.FC = () => {
  
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

export default FullscreenToggle;