import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../actions";
import styles from "./Paging.module.css";

export default function paging({ recipesPerPage, recipesState }) {
  const currentPageState = useSelector((state) => state.currentPage);
  const dispatch = useDispatch();
  //iterate pushing the quantity of elements for each page in an array
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recipesState / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  //invoking paging()
  const handleClick = (e) => {
    dispatch(setCurrentPage(e.target.id));
  };

  return (
    <div className="paging">
      <div>{pageNumbers.length !== 0 && currentPageState}</div>
      <ul className={styles.pagingList}>
        {pageNumbers.length > 1 &&
          pageNumbers.map((number) => {
            return (
              <li key={number} className={styles.liTag}>
                <button
                  id={number}
                  className={styles.button}
                  onClick={(e) => handleClick(e)}
                >
                  {number}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
