import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar({ name, setName }) {
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name));
  }

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleChange(e)}
        value={name}
      />
      <button
        className={styles.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
