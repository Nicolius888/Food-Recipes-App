import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-hooks";
import { getRecipes } from "../actions";
import { Link } from "react-router-dom";
export default function Home() {
  const dispatch = useDispatch();
  const recipesState = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]); //ver que funcione con el dispatch  como dependencia, no deberia fallar peeero...

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div>
      <h1>Search Recipes!</h1>
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
        <button onClick={(e) => handleClick(e)}>Add a new recipe</button>
      </Link>
    </div>
  );
}
