import React from 'react';
import {Result, Photo} from './ImageGalleryItem.styled';

export default function ImageGalleryItem ({result, modalPhoto, onClick}) {

    const handleClick = () => {
        const modalImage = result.largeImageURL;
        modalPhoto(modalImage);
        onClick();
    }
        
    return (
        <Result className="gallery-item" onClick={handleClick}>
            <Photo src={result.webformatURL} alt={result.tags} />
        </Result>
    );
}
