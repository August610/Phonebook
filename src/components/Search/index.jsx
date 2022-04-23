import React from "react";
import s from "./styles.module.css";
import { ReactComponent as SearchIcon } from "./img/ic-search.svg";
import { ReactComponent as CloseIcon } from "./img/ic-close-input.svg";

export const Search = ({ handleInputChange, handleFormSubmit }) => {
  return (
    <form className={s.search} onSubmit={handleFormSubmit}>
      <input
        onInput={function (e) {
          handleInputChange(e.target.value);
        }}
        type="text"
        placeholder="Поиск"
        className={s.input}
      />
      {/* <button className={s.btn}>
        <SearchIcon />
        {false && <CloseIcon />}
      </button> */}
    </form>
  );
};
