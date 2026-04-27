import React from 'react';
import './CloseButton.css';

const CloseButton = ({ onClick }) => (
  <button className="close_button" onClick={onClick}>
    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 1.5L1.5 21.5M1.50002 1.5L21.5 21.5" stroke="#2B2B2B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
);

export default CloseButton;
