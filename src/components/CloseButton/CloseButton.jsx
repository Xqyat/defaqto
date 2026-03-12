import React from 'react';
import './CloseButton.css';

const CloseButton = ({ onClick }) => (
  <button className="close_button" onClick={onClick}>×</button>
);

export default CloseButton;
