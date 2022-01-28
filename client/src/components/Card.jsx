import React from "react";
import styles from "./Card.module.css";

export default function Card({ id, name, image, diets }) {
  // let randomize = Math.floor(Math.random() * diets.length); //this is to show only one diet but not always the same
  return (
    <div id={id} className={styles.card}>
      <img className={styles.img} src={image} alt="img not found" />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.diets}>
        {diets.map((e) => (
          <p className={styles.diet}>{e}</p>
        ))}
      </p>
    </div>
  );
}
//[randomize]
