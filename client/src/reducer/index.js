const initialState = {
  recipes: [],
  recipesCopy: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        recipesCopy: action.payload,
      };
    case "DELETE_RECIPES":
      return {
        ...state,
        recipes: [],
      };
    case "INVERT_ORDER":
      const recipesInverted = state.recipes.slice().reverse();
      return {
        ...state,
        countries: recipesInverted,
      };
    case "FILTER_BY_DIETS":
      const allRecipes = state.recipesCopy; //filter trough the copy
      const dietFilter =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((recipe) => recipe.diet.includes(action.payload));
      return {
        ...state,
        recipes: dietFilter,
      };
    case "FILTER_BY_SCORE":
      const allRecipes2 = state.recipesCopy;
      // const payloadToNum = action.payload.split("-").map(Number);
      console.log(action.payload);
      const scoreFilter =
        action.payload === "all"
          ? allRecipes2
          : allRecipes2.filter((recipe) => recipe.score == action.payload);
      return {
        ...state,
        recipes: scoreFilter,
      };
    default:
      return state;
  }
}

export default rootReducer;
