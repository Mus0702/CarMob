import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchItem, onSearchChange }) => {
  return (
    <div className="position-relative w-50">
      <input
        type="text"
        className="form-control pl-3 pr-5 w-100"
        value={searchItem}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
      />
      <div className="form-text">
        Search by departure address, arrival address or departure date
      </div>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="position-absolute"
        style={{ top: "35%", right: "10px", transform: "translateY(-50%)" }}
      />
    </div>
  );
};

export default SearchBar;
