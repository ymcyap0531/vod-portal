import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export interface SearchProps {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchData: () => void;
  handleEnter: (e: any) => void;
  styles: any;
}

const Search: React.FC<SearchProps> = ({
  onSearchChange,
  onSearchData,
  handleEnter,
  styles,
}) => {
  const [search, setSearch] = useState<boolean>(false);
  const handleSearch = () => {
    setSearch(!search);
  };

  return (
    <div>
      {!search && (
        <div className={styles.searchbtn_expand} onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      )}
      {search && (
        <div className="searchinput-container text-black">
          <input
            onChange={onSearchChange}
            onKeyPress={handleEnter}
            type="text"
            placeholder="Search.."
            name="search"
          />
          <div
            className={`${styles.searchbtn} searchbtn`}
            onClick={onSearchData}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
