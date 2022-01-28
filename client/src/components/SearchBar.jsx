import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName, setCurrentPage } from "../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  name,
  setName,
  setLoadingOrNull,
  deleteRecipes,
}) {
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(deleteRecipes());
    dispatch(setCurrentPage(1));
    setLoadingOrNull("Loading...");
    await dispatch(searchByName(name));
    setLoadingOrNull("Nothing here...");
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
