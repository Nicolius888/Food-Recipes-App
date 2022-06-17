import axios from "axios";

export function getRecipes() {  //get all recipes from backend
  return async function (dispatch) {
    try {
      const recipes = await axios.get("http://localhost:3001/recipes");
      return dispatch({
        type: "GET_RECIPES",
        payload: recipes.data,
      });
    } catch (error) {
      console.log("Error getting recipes", error);
    }
  };
}
export function deleteRecipes() {  //delete all recipes from global state
  return {
    type: "DELETE_RECIPES",
  };
}
export function filterByDiets(payload) {  //filters in the global state
  return {
    type: "FILTER_BY_DIETS",
    payload,
  };
}
export function filterByScore(payload) {
  return {
    type: "FILTER_BY_SCORE",
    payload,
  };
}
export function invertOrder(payload) {
  return {
    type: "INVERT_ORDER",
    payload,
  };
}
export function searchByName(payload) {  //search in the backend
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/recipes?name=${payload}`
      );
      return dispatch({
        type: "SEARCH_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log("Error searching by name", error);
      return dispatch({
        type: "SEARCH_BY_NAME",
        payload: [],
      });
    }
  };
}
export function postRecipe(payload) {   //post a new recipe in the database
  return async function () {
    const postRecipe = await axios.post(
      "http://localhost:3001/recipes",
      payload
    );
    return postRecipe;
  };
}
export function getTypes() {            //get diet types from database
  return async function () {
    try {
      const types = await axios.get("http://localhost:3001/types", {});
      return console.log(types.data);
    } catch (error) {
      console.log("Error getting types", error);
    }
  };
}
export function getDetail(id) {        //get a recipe by id from the backend
  return async function (dispatch) {
    try {
      const detail = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: detail.data,
      });
    } catch (error) {
      console.log("Error getting detail", error);
    }
  };
}
export function deleteDetail() {    //to use recipe detail in the global state
  return {
    type: "DELETE_DETAIL",
  };
}
export function setCurrentPage(payload) {  //to pagination
  return {
    type: "SET_CURRENT_PAGE",
    payload,
  };
}

// export function filtrarPorMenorOMayor(payload) {
//   return {
//     type: "FILTRAR_POR_MENOR_O_MAYOR",
//     payload,
//   };
// }

//add action to delete a recipe by id
//add action to update a recipe by id