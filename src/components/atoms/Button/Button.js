import React from 'react';
import './Button.css';

const Button = ({ text, type = 'button', onClick, width }) => {
  return (
    <div>
      <button className="glow-on-hover" type={type} onClick={onClick} style={{width: width}}>
        {text}
      </button>
    </div>
  );
};

export default Button;
