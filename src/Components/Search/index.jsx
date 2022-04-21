import React, { useState } from "react";
import "./index.css";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const handleOnChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearch = () => {
    alert(searchText);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSearch();
    }
  };
  return (
    <div className="search_bar">
      <input
        id="sbox"
        name="q"
        placeholder="To search type"
        type="text"
        value={searchText}
        onChange={handleOnChange}
        onKeyDown={handleKeypress}
      />
      <button className="search_icon" type="submit" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};

export default Search;
