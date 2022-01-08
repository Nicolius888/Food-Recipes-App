import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterByDiets,
  deleteRecipes,
  filterByScore,
  invertOrder,
} from "../actions";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "./Card";
import Paging from "./Paging";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const recipesState = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

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

  //filters!
  //reload recipes
  async function handleReload(e) {
    e.preventDefault();
    //for "loading..."
    dispatch(deleteRecipes());
    //resets...
    setCurrentPage(1);
    setDietSelectLabel("all");
    setScoreSelectLabel("all");
    setOrderSelectLabel("asc");
    //our function
    await dispatch(getRecipes());
  }
  //invert order
  const [orderSelectLabel, setOrderSelectLabel] = useState("asc");
  function handleInvertOrder(e) {
    e.preventDefault();
    //resets
    setScoreSelectLabel("all");
    dispatch(filterByScore("all"));
    setDietSelectLabel("all");
    dispatch(filterByDiets("all"));
    //function
    setOrderSelectLabel(e.target.value);
    dispatch(invertOrder(e.target.value));
  }
  //diet filter
  const [dietSelectLabel, setDietSelectLabel] = useState("all");
  function handleFilterByDiet(e) {
    //resets
    setOrderSelectLabel("asc");
    dispatch(invertOrder("asc"));
    setScoreSelectLabel("all");
    dispatch(filterByScore("all"));
    //function
    setDietSelectLabel(e.target.value);
    paging(1);
    dispatch(filterByDiets(e.target.value));
  }
  //score filter
  const [scoreSelectLabel, setScoreSelectLabel] = useState("all");
  function handleFilterByScore(e) {
    //resets
    setOrderSelectLabel("asc");
    dispatch(invertOrder("asc"));
    setDietSelectLabel("all");
    dispatch(filterByDiets("all"));
    //function
    setScoreSelectLabel(e.target.value);
    paging(1);
    dispatch(filterByScore(e.target.value));
  }
  //idea, creo que si cada filtro se resetea en all antes de cada cambio, podrian ser acumulables...hacerlos funcionar luego analizar...
  return (
    <div>
      <h1 className={styles.title}>Search Recipes!</h1>
      <SearchBar />
      <div>
        <div>
          <label>Alphabetical order:&#160;</label>
          <select
            value={orderSelectLabel}
            onChange={(e) => handleInvertOrder(e)}
          >
            <option value="asc">Ascendent</option>
            <option value="desc">Descendent</option>
          </select>
        </div>
        <div>
          <label>Filter by diet:&#160;</label>
          <select
            value={dietSelectLabel}
            onChange={(e) => handleFilterByDiet(e)}
          >
            <option value="all">No filter</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="gluten free">Gluten free</option>
            <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="primal">Primal</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="fodmap friendly">Fodmap friendly</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="whole 30">Whole 30</option>
          </select>
        </div>
        <div>
          <label>Filter by score between:&#160;</label>
          <select
            value={scoreSelectLabel}
            onChange={(e) => handleFilterByScore(e)}
          >
            <option value="all">No filter</option>
            <option value="90">0 to 10</option>
            <option value="91">10 to 20</option>
            <option value="92">20 to 30</option>
            <option value="93">30 to 40</option>
            <option value="94">40 to 50</option>
            <option value="95">50 to 60</option>
            <option value="96">60 to 70</option>
            <option value="97">70 to 80</option>
            <option value="98">80 to 90</option>
            <option value="99">90 to 100</option>
          </select>
        </div>
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
          <p className={styles.title}>Loading...</p> //solucionar esto convirtiendolo en un estado local que por defecto sea loading pero que las request nulas modifiquien a nothing here apenas y siempre dado el onchange
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
