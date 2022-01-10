import React, {Component} from 'react';
import {Header, SearchForm, Button, Label, Input} from './Searchbar.styled';

export default class Searchbar extends Component {

    state = {
        searchWord: null
    };

    handleChange = event => {
        this.setState({searchWord: event.currentTarget.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        if(this.state.searchWord.trim() === '') {
            return;
        };

        this.props.onSubmit(this.state.searchWord);
        this.setState({searchWord: ''});
    };

    render () {
        return (
            <Header className="searchbar">
                <SearchForm className="form" onSubmit={this.handleSubmit}>
                    <Button type="submit" className="button">
                        <Label className="button-label">Search</Label>
                    </Button>
                
                    <Input
                        onChange={this.handleChange}
                        className="input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.searchWord}
                    />
                </SearchForm>
            </Header>
      )
    };   
};

// export default Searchbar;