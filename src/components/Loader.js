import React from 'react';
import '../styles/loader.styles.css';

export const Loader = () => {
    return (
        <div className='loader-wrapper'>
            <div className='loader'>
                {[...Array(20)].map((_, index) => (
                    <span key={index} className={`loader-span span-${index+1}`} style={{'--i': index+1}}></span>
                ))}
            </div>
        </div>
    )
};
