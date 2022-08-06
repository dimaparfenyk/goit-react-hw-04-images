import {useState} from "react";
import {FiSearch} from "react-icons/fi";
import {toast} from 'react-toastify';
import PropTypes from 'prop-types';

import { Searchbar, SearchForm, SearchFormBtn,SearchFormBtnLabel, SearchFormInput } from "./SearchBar.styled";

export const SearchBar = ({onSubmit}) => {
    const [itemName, setItemName] = useState('');
  
   const handleNameChange = e => setItemName(e.currentTarget.value.toLowerCase());
   
    const handleSubmit = e => {
        e.preventDefault();
 
        if (itemName.trim() === '') {

            return toast.warn('Query is empty. Please write something!', {
                position: "top-right",
                autoClose: 4000,
            });
        };
        onSubmit(itemName);
        setItemName('');
    };

    return (
        <Searchbar className="Searchbar">
            <SearchForm
                className="form"
                onSubmit={handleSubmit}>
                <SearchFormBtn type="submit" className="button">
                    <FiSearch />
                    <SearchFormBtnLabel className="button-label">Search</SearchFormBtnLabel>
                </SearchFormBtn>

                <SearchFormInput
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images"
                    value={itemName}
                    onChange={handleNameChange} />
            </SearchForm>        
        </Searchbar>
    );
};

SearchBar.propTypes ={
    onSubmit: PropTypes.func.isRequired
};