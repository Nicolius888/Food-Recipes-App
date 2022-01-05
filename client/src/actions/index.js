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
