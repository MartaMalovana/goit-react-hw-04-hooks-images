import React, { useState } from 'react';
import "./App.css";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

export default function App () {
  
  const [inputWord, setInputWord] = useState(null);
  
  const inputSearch = (inputWord) => {
    setInputWord(inputWord);
  };
  
  return (
    <div className="App">
      <Searchbar onSubmit={inputSearch}></Searchbar>
      <ImageGallery searchWord={inputWord}></ImageGallery>
    </div>
  );
}

