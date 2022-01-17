import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div>
      <h1 className={styles.h1}>Recipes App!</h1>
      <h2 className={styles.h2}>
        based on{" "}
        <a
          href="https://spoonacular.com/food-api"
          style={{ textDecoration: "none", color: "black" }}
        >
          Spoonacular API
        </a>
      </h2>
      <Link to="/home">
        <button className={styles.button}>S T A R T</button>
      </Link>
    </div>
  );
}
