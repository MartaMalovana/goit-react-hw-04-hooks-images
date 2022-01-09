import {Header} from './Searchbar.styled';

function Searchbar () {
        return (
            <Header class="searchbar">
                <form class="form">
                    <button type="submit" class="button">
                        <span class="button-label">Search</span>
                    </button>
                
                    <input
                        class="input"
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                    />
                </form>
            </Header>
      )
}

export default Searchbar;