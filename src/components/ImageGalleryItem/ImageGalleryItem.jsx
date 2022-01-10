import React, {Component} from 'react';
import {Result, Photo} from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
    
    render () {
        const {webformatURL, largeImageURL, tags} = this.props.result;
        
        return (
            <Result className="gallery-item">
                <Photo src={webformatURL} alt={tags} />
            </Result>
        );
    }
}
