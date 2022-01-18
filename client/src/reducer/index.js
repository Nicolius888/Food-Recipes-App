const initialState = {
  recipes: [],
  recipesCopy: [],
  /////////////////////
  detail: [],
  types: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      let getRecipes = action.payload;
      getRecipes.map(
        (e) =>
          e.createdInDb && (e.Diets = e.Diets.map((e) => e).map((e) => e.name))
      );
      return {
        ...state,
        recipes: getRecipes,
        recipesCopy: getRecipes,
      };
    case "DELETE_RECIPES":
      return {
        ...state,
        recipes: [],
        recipesCopy: [],
      };
    case "INVERT_ORDER":
      const allRecipes3 = state.recipesCopy;
      const allRecipes3Reverse = allRecipes3.reverse();
      const order = action.payload === "asc" ? allRecipes3 : allRecipes3Reverse;
      return {
        ...state,
        recipes: order,
      };
    case "FILTER_BY_DIETS":
      let allRecipes = state.recipesCopy;
      const dietFilter =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((recipe) =>
              recipe.Diets.includes(action.payload)
            );
      return {
        ...state,
        recipes: dietFilter,
      };
    case "FILTER_BY_SCORE":
      const allRecipes2 = state.recipesCopy;
      const scoreFilter =
        action.payload === "all"
          ? allRecipes2
          : allRecipes2.filter((recipe) => recipe.score == action.payload);
      return {
        ...state,
        recipes: scoreFilter,
      };
    case "SEARCH_BY_NAME":
      let getName = action.payload;
      getName.map(
        (e) =>
          e.createdInDb && (e.Diets = e.Diets.map((e) => e).map((e) => e.name))
      );
      return {
        ...state,
        recipes: getName,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "DELETE_DETAIL":
      return {
        ...state,
        detail: [],
      };
    default:
      return state;
  }
}
export default rootReducer;
