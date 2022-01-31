import React, { useCallback, useState, useEffect } from 'react';
import "./App.css";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import {Container} from './components/ImageGallery/ImageGallery.styled';
import Loader from './components/Loader/Loader';
import firebase from 'firebase';
import {a} from './services/firebase';

export default function App () {
  
  const [inputWord, setInputWord] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const [auth, setAuth] = useState(false);
  const [userName, setuserName] = useState('');
  const [userPassword, setuserPassword] = useState('');
 

  const fetchAPI = useCallback(() => {
    const myKey = '24296809-9b93a2a7fdd6c9a326bbfa052';
    
    if(inputWord === '') {
        return;
    };

    setStatus('pending');

  fetch(`https://pixabay.com/api/?q=${inputWord}&page=${page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
            return response.json();
        })
        .then(arr => {
            setResults((results) => ( page === 1 ? arr.hits : [...results, ...arr.hits]))
            setStatus('resolved');
            setTotalHits(arr.totalHits);

            if(arr.hits.length === 0) {
                setError(`По слову ${inputWord} зображень не знайдено`);
                setStatus('rejected');
            };
        })
        // .then(() => 
        //  page === 1 && 
        //  window.scrollTo({
        //   top: document.documentElement.scrollHeight,
        //   behavior: "smooth"
        //   }))
        .catch(error => setStatus('rejected'));
}, [page, inputWord]);

useEffect(() => {
  fetchAPI();
}, [fetchAPI]);

  const inputSearch = (inputWord) => {
    setInputWord(inputWord);
    setPage(1);
  };
  
  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const loadMorePhotos = () => {
    setPage(page + 1);
  }

  const getModalPhoto = (url) => {
    setModalImg(url);
}

 const onClick = async() => {
  console.log(userName, userPassword);
  setAuth(true);
  const user = await a.auth().createUserWithEmailAndPassword(userName, userPassword);
  console.log(user);
}

  return (
    <>
    {auth ? 
      <div className="App">
      <Searchbar onSubmit={inputSearch}></Searchbar>

      {status === 'idle' ? <h2>Enter some word to search!</h2> : null}
      {status === 'pending' ? <Loader/> : null}
      {status === 'rejected' ? <h2>{error}</h2> : null}
      
      <ImageGallery searchWord={inputWord} toggleModal={toggleModal} getModalPhoto={getModalPhoto} page={page} results={results}></ImageGallery>
      <Container>
        {results.length && results.length < totalHits ? <Button onClick={loadMorePhotos}></Button> : null}
      </Container>
      {showModal && <Modal onClick={toggleModal} modalImg={modalImg}><button type='button' onClick={toggleModal}></button></Modal>}
      </div>
      : <div>
      <label>EMAIL<input name='email' onChange={(event)=>setuserName(event.target.value)} value={userName}></input></label>
      <label>PASSWORD<input name='password' onChange={(event)=>setuserPassword(event.target.value)} value={userPassword}></input></label>
      <button onClick={onClick}>REGISTER</button>
      </div>
    }
    </>
  );
}

