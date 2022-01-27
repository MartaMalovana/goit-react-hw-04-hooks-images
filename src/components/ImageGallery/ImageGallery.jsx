import React, {useEffect, useState} from 'react';
import {GalleryList, Container} from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default function ImageGallery ({searchWord}) {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');
    const [showModal, setShowModal] = useState(false);
    const [modalImg, setModalImg] = useState(null);
    const [page, setPage] = useState(1);

    const fetchAPI = (searchPage, startResult) => {
        const myKey = '24296809-9b93a2a7fdd6c9a326bbfa052';
        setStatus('pending');

        fetch(`https://pixabay.com/api/?q=${searchWord}&page=${searchPage}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
                return response.json();
            })
            .then(arr => {
                setResults([...startResult, ...arr.hits]);
                setStatus('resolved');
                if(arr.hits.length === 0) {
                    setError(`По слову ${searchWord} зображень не знайдено`);
                    setStatus('rejected');
                };
            })
            .catch(error => setStatus('rejected'));
    }

    useEffect(() => {
        if(searchWord === null) {
            return;
        };
        setPage(1);
        fetchAPI(1, []);
        window.scrollTo(0, 0);
    }, [searchWord]);

    const toggleModal = () => {
        setShowModal(!showModal);
    }
    
    const getModalPhoto = (url) => {
        setModalImg(url);
    }

    const loadMorePhotos = () => {
        setPage(page + 1);
        fetchAPI(page + 1, results);
    }

    if(status === 'idle') {
        return <h2>Enter some word to search!</h2>;
    }

    if(status === 'pending') {
        return <Loader></Loader>;
    }

    if(status === 'resolved') {
        return <>
                <GalleryList >
                    {results.map(result => <ImageGalleryItem key={result.id} result={result} onClick={toggleModal} modalPhoto={getModalPhoto}></ImageGalleryItem>)}
                </GalleryList>
                <Container><Button onClick={loadMorePhotos}></Button></Container>
                {showModal && <Modal onClick={toggleModal} modalImg={modalImg}><button type='button' onClick={toggleModal}></button></Modal>}
                </>
    }

    if(status === 'rejected') {
        return <h2>{error}</h2>;
    }
};

// Варіант з useReducer (не вдається очистити results перед fetch з новим пошуковим словом, результат ліпить в існуючий масив)

// export default function ImageGallery ({searchWord}) {
//     const fetchReducer = (state, action) => {
//         switch (action.type) {
//             case 'pending':
//                 return {...state, error: null, status: 'pending'};
//             case 'rejected':
//                 return {...state, error: `По слову ${searchWord} зображень не знайдено`};
//             case 'resolved':
//                 return {...state, results: action.payload, status: 'resolved'};
//             case 'modal':
//                 return {...state, showModal: !state.showModal};
//             case 'modalPhoto':
//                 return {...state, modalImg: action.payload};
//             case 'loadMore':
//                 return {...state, page: state.page + action.payload};
//             case 'newSearch':
//                 return {...state, results: null, error: null, status: 'idle', page: action.payload};
//             default: console.log('Something is wrong...');
//         };
//     };

//     const [state, dispatch] = useReducer(fetchReducer, 
//         {   
//             results: [],
//             error: null,
//             status: 'idle',
//             showModal: false,
//             modalImg: null,
//             page: 1
//         }
//     );


//     const toggleModal = () => {
//         return dispatch({type: 'modal'});
//     }
    
//     const getModalPhoto = (url) => {
//         return dispatch({type: 'modalPhoto', payload: url});
//     }

//     const loadMorePhotos = () => {
//         return dispatch({type: 'loadMore', payload: 1});
//     }

//     useEffect(() => {
//         if(searchWord === null) {
//             return;
//         };

//         const fetchAPI = (searchWord) => {
//             const myKey = '24296809-9b93a2a7fdd6c9a326bbfa052';
//             console.log(state.page);
//                 dispatch({type: 'pending'});
//                 fetch(`https://pixabay.com/api/?q=${searchWord}&page=${state.page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
//                     .then(response => {
//                         return response.json();
//                     })
//                     .then(arr => {
//                         if(arr.hits.length === 0) {
//                            return dispatch({type: 'rejected'});
//                         }
                        
//                         return dispatch({type: 'resolved', payload: arr.hits});
//                     })
//                     .catch(error => dispatch({type: 'rejected'}));
            
//         }
        
//         // dispatch({type: 'newSearch', payload: 1});
//         window.scrollTo(0, 0);
//         fetchAPI(searchWord);
//     }, [searchWord, state.page]);

//     if(state.status === 'idle') {
//         return <h2>Enter some word to search!</h2>;
//     }

//     if(state.status === 'pending') {
//         return <Loader></Loader>;
//     }

//     if(state.status === 'resolved') {
//         return <>
//                 <GalleryList >
//                 {state.results.map(result => <ImageGalleryItem key={result.id} result={result} onClick={toggleModal} modalPhoto={getModalPhoto
//                 }></ImageGalleryItem>)}
//                 </GalleryList>
//                 <Container><Button onClick={loadMorePhotos}></Button></Container>
//                 {state.showModal && <Modal onClick={toggleModal} modalImg={state.modalImg}><button type='button' onClick={toggleModal}></button></Modal>}
//                 </>
//     }

//     if(state.status === 'rejected') {
//         return <h2>{state.error}</h2>;
//     }

//     }

