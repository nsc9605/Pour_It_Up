import React from 'react';

function SearchForm(props) {
    return (
        <div >
            <form>
                <input 
                name="search"
                type="text"
                className="search-input"
                placeholder="Enter an ingredient..."
                aria-label="Search"
                // onChange={props.changeHandler}
                />
                <button className="m-2 rounded">Search</button>
            </form>
        </div>
    )
}

export default SearchForm;