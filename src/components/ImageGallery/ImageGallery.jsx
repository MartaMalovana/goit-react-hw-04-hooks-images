import React, {Component} from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import {GalleryList} from './ImageGallery.styled';

export default class ImageGallery extends Component {
    state = {
        results: null,
        error: null,
        status: 'idle'
    };

    componentDidUpdate (prevProps) {
        const prevKeyWord = prevProps.searchWord;
        const keyWord = this.props.searchWord;

        if(prevKeyWord !== keyWord) {
            const myKey = '24296809-9b93a2a7fdd6c9a326bbfa052';
            this.setState({results: null, error: null});

            fetch(`https://pixabay.com/api/?q=${keyWord}&page=1&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    return response.json();
                })
                .then(arr => {
                    if(arr.hits.length === 0) {
                        this.setState({error: `По слову ${keyWord} зображень не знайдено`});
                    }
                   return this.setState({results: arr.hits});
                })
                .catch(error => this.setState({error}));
        }
    };

    render () {
        const {results, error, status} = this.state;

        // if(status === 'rejected') {
        //     return <h2>{error}</h2>;
        // }

        
        return (
            <div>
                {error && <h2>{error}</h2>}
                {results && <GalleryList>{results.map(result => <ImageGalleryItem key={result.id} result={result}></ImageGalleryItem>)}</GalleryList>}
            </div>
      );
    }
}