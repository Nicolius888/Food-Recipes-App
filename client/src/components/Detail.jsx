import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, deleteDetail } from "../actions";
import styles from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const detailState = useSelector((state) => state.detail);
  const { id } = useParams();

  const {
    name,
    Diets,
    img,
    resume,
    dishTypes,
    healtScore,
    score,
    steps,
    createdInDb,
  } = detailState;

  useEffect(() => {
    dispatch(deleteDetail());
    dispatch(getDetail(id));
  }, [dispatch]);

  return (
    <div>
      {detailState.id ? (
        <div className={styles.all} key={id}>
          <h1 className={styles.name}>{name}</h1>
          <h2 className={styles.diets}>
            {createdInDb
              ? Diets.map((e) => e).map((e) => {
                  return <p className={styles.diet}>&#160;{e.name}&#160;</p>;
                })
              : Diets.map((e) => {
                  return <p className={styles.diet}>&#160;{e}&#160;</p>;
                })}
          </h2>
          <div className={styles.imgAndData}>
            <img src={img} className={styles.img} alt="img error" />
            <h3 className={styles.data}>Dish Types:&#160;{dishTypes}</h3>
            <h3 className={styles.data}>Healt Score:&#160;{healtScore}</h3>
            <h3 className={styles.data}>Score:&#160;{score}</h3>
          </div>
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: resume }}
          />
          <p className={styles.text}>Steps: {steps.map((e) => e + ". ")}</p>
        </div>
      ) : (
        <h1 className={styles.loading}>Loading...</h1>
      )}
      <Link to="/home">
        <button className={styles.button}>Back to Home</button>
      </Link>
    </div>
  );
}
