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
export function postRecipe(payload) {
  return async function () {
    const postRecipe = await axios.post(
      "http://localhost:3001/recipes",
      payload
    );
    return postRecipe;
  };
}
export function getTypes() {
  return async function (dispatch) {
    try {
      const types = await axios.get("http://localhost:3001/types", {});
      return dispatch({
        type: "GET_TYPES",
        payload: types.data,
      });
    } catch (error) {
      console.log("Error getting types", error);
    }
  };
}
export function getDetail(id) {
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
export function deleteDetail() {
  return {
    type: "DELETE_DETAIL",
  };
}
