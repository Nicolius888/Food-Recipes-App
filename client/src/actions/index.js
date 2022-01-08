import axios from "axios";

export function getRecipes() {
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
export function deleteRecipes() {
  return {
    type: "DELETE_RECIPES",
  };
}
export function filterByDiets(payload) {
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
export function searchByName(payload) {
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
      console.log("Error searchin by name", error);
    }
  };
}
