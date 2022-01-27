import { useState } from 'react';
import {FcSearch} from 'react-icons/fc';
import { IconContext } from "react-icons";
import {Header, SearchForm, Button, Input} from './Searchbar.styled';



export default function Searchbar ({onSubmit}) {
    const [searchWord, setSearchWord] = useState('');

    const handleChange = event => {
        setSearchWord(event.currentTarget.value);
    }

    const handleSubmit = event => {
        event.preventDefault();

        if(searchWord.trim() === '') {
            return;
        };

        onSubmit(searchWord);
        setSearchWord('');
    };

    return (
        <Header className="searchbar">
            <SearchForm className="form" onSubmit={handleSubmit}>
                <Button type="submit" className="button">
                <IconContext.Provider value={{size: "2em"}}><FcSearch/></IconContext.Provider>
                </Button>
            
                <Input
                    onChange={handleChange}
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchWord}
                />
            </SearchForm>
        </Header>
    );  
};

