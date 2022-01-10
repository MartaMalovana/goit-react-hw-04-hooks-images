import React, {Component} from 'react';
import "./App.css";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    inputWord: null
  };

  inputSearch = (inputWord) => {
    this.setState({inputWord: inputWord});
  };

  render () {
    return (
      <div className="App">
        <Searchbar onSubmit={this.inputSearch}></Searchbar>
        <ImageGallery searchWord={this.state.inputWord}></ImageGallery>
      </div>
    );
  }
}

// export default App;
