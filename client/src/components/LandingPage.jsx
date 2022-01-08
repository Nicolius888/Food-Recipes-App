import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <h1 className={styles.h1}>Recipes App!</h1>
      <h2 className={styles.h2}>based on Spoonacular API</h2>
      <Link to="/home">
        <button className={styles.button}>Start!</button>
      </Link>
    </div>
  );
}
