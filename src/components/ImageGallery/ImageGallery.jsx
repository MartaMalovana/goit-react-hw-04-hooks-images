import React, {Component} from 'react';
import {GalleryList, Container} from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

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
            this.setState({results: null, error: null, status: 'pending'});

            fetch(`https://pixabay.com/api/?q=${keyWord}&page=1&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    return response.json();
                })
                .then(arr => {
                    if(arr.hits.length === 0) {
                       return this.setState({status: 'rejected', error: `По слову ${keyWord} зображень не знайдено`});
                    }
                   return this.setState({results: arr.hits, status: 'resolved'});
                })
                .catch(error => this.setState({status: 'rejected'}));
        }
    };

    render () {
        const {results, error, status} = this.state;

        if(status === 'idle') {
            return <h2>Введіть слово для пошуку</h2>;
        }

        if(status === 'pending') {
            return <Loader></Loader>;
        }

        if(status === 'resolved') {
            return <><GalleryList>
                     {results.map(result => <ImageGalleryItem key={result.id} result={result}></ImageGalleryItem>)}
                   </GalleryList>
                   <Container><Button></Button></Container></>
        }

        if(status === 'rejected') {
            return <h2>{error}</h2>;
        }
       };
    };
