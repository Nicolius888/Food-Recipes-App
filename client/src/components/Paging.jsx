import React from "react";
import styles from "./Paging.module.css";

export default function paging({ recipesPerPage, recipesState, paging }) {
  //iterate pushing the quantity of elements for each page in an array
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recipesState / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  //invoking paging()
  const handleClick = (e) => {
    paging(e.target.id);
  };

  return (
    <div className="paging">
      <ul className={styles.pagingList}>
        {pageNumbers.map((number) => {
          return (
            <li key={number} className={styles.liTag}>
              <button
                id={number}
                className={styles.pagingButton}
                onClick={handleClick}
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
