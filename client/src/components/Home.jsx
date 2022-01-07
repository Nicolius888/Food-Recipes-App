import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "./Card";
import Paging from "./Paging";

export default function Home() {
  const dispatch = useDispatch();
  const recipesState = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]); //ver que funcione con el dispatch  como dependencia, no deberia fallar peeero...
  //reload recipes
  async function handleReload(e) {
    e.preventDefault();
    await dispatch(getRecipes());
    setCurrentPage(1);
  }

  //paging
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipesState.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className={styles.title}>Search Recipes!</h1>
      <div>
        <select>
          {/*select: add tag order to controll de option selected with a local state */}
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
        <select>
          <option value="vegetarian">Vegetarian</option>
          <option value="gluten free">Gluten free</option>
          <option value="lacto ovo">Lacto ovo vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="fodmap">Fodmap friendly</option>
          <option value="keto">Ketogenic</option>
          <option value="whole30">Whole 30</option>
        </select>
      </div>

      <Link to="/create">
        <button>Add a new recipe</button>
      </Link>

      <button onClick={(e) => handleReload(e)}>Reload recipes</button>

      <div className={styles.cards}>
        {currentRecipes.length ? (
          currentRecipes.map((recipe) => {
            return (
              <Card
                key={recipe.id}
                name={recipe.name}
                image={recipe.img}
                diets={recipe.diet}
              />
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Paging
        recipesPerPage={recipesPerPage}
        recipesState={recipesState.length}
        paging={paging}
      />
    </div>
  );
}
