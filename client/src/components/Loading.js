import React from 'react';
import loadingGif from '../images/loading-arrow.gif';

export default function Loading() {
    return (
        <div className="loading">
            
            <img src={loadingGif} alt="" />
        </div>
    )
}