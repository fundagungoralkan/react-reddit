import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeSearchTerm } from '../../store/redditSlice';
import './SearchBar.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeSearchTerm(inputValue.trim())); // Trim whitespace from the search term
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
