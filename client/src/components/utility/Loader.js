import React from 'react';
import './loader.scss';
const Loader = () => {
    return (
        <div className="loading">
        <div class="loading__ripple"><div></div><div></div></div>
        <div className="loading__text">Loading...</div>
        </div>
      
    );
};

export default Loader;