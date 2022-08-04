import { Component } from "react";

import { FiSearch } from "react-icons/fi";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


import { Searchbar, SearchForm, SearchFormBtn,SearchFormBtnLabel, SearchFormInput } from "./SearchBar.styled";

export class SearchBar extends Component {
    
    state = {
        itemName: '',
    };
    
    handleNameChange = e => {
        this.setState({ itemName: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        const { itemName} = this.state;
        const { onSubmit } = this.props;

        e.preventDefault();

        if (itemName.trim()==='') {
          return toast.warn('Query is empty. Please write something!', {
            position: "top-right",
            autoClose: 4000,
        });
        };
        
       onSubmit(itemName);
       this.setState({itemName:''})
    };

    render() {
        return (
            <Searchbar className="Searchbar">
                <SearchForm
                    className="form"
                    onSubmit={this.handleSubmit}>
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
                        value={this.state.itemName}
                        onChange={this.handleNameChange} />
                </SearchForm>
                
            </Searchbar>
        );
    }
};

SearchBar.propTypes ={
    onSubmit: PropTypes.func.isRequired,
    totalHits:PropTypes.number.isRequired,
};