import React, { useRef } from "react";
import clsx from "clsx";
import style from "./Search.module.scss";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = () => {
    if (inputRef.current) {
      const query = inputRef.current.value.toLowerCase();
      onSearch(query);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className={clsx(style.input)}
        onChange={handleSearchChange}
        type="text"
        name="search"
      />
    </>
  );
};

export default Search;
