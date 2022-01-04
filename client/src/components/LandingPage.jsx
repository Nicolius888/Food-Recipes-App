import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <h1 className={styles.h1}>Recipes App!</h1>
      <h3 className={styles.h3}>based on Spoonacular API</h3>
      <Link to="/home">
        <button className={styles.button}>Go!</button>
      </Link>
    </div>
  );
}
