import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, deleteDetail, setCurrentPage } from "../actions";
import styles from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const detailState = useSelector((state) => state.detail);
  const { id } = useParams();

  const currentPageState = useSelector((state) => state.currentPage);

  const {
    name,
    Diets,
    img,
    resume,
    dishTypes,
    healthScore,
    // score,
    steps,
    createdByUser,
  } = detailState;

  useEffect(() => {
    dispatch(deleteDetail());
    dispatch(getDetail(id));
  }, [dispatch]);

  function handleClick() {
    dispatch(setCurrentPage(currentPageState));
  }
//comentar TODO e ir tratando de debuggear x ahi 
  return (
    <div>
      {detailState.id ? (
        <div className={styles.all} key={id}>
          <h1 className={styles.name} >{name}</h1>

          <h2 className={styles.diets}>
            {Diets.map((e) => e).map((e, i=0) => {
                  return <p key={name+i++} className={styles.diet}>&#160;{e.name}&#160;</p>;
                })}
          </h2>
          {/*/////////////////////////////////////////////////////////////////////*/}
          <div className={styles.imgAndData}>
            <img src={img} className={styles.img} alt="img error" />
            <h3 className={styles.data}>
              Dish Types:&#160;{dishTypes.map((e) => e + " ")}
            </h3>
            <h3 className={styles.data}>Health Score:&#160;{healthScore}</h3>
          </div> 
          {/*/////////////////////////////////////////////////////////////////////*/}
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: resume }}
          />
          {steps.length !== 0 && (
            <p className={styles.text}>Steps: {steps[0]}</p>
          )}
        </div>
      ) : (
        <h1 className={styles.loading}>Loading...</h1>
      )}
      {/*/////////////////////////////////////////////////////////////////////*/}
      <Link to="/home">
        <button className={styles.button} onClick={handleClick()}>
          Back to Home
        </button>
      </Link>
    </div>
  );
}
