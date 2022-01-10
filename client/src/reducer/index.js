const initialState = {
  recipes: [],
  recipesCopy: [],
  types: [],
  detail: [],
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
        recipesCopy: [],
      };
    case "INVERT_ORDER":
      const allRecipes3 = state.recipesCopy;
      const recipesInverted = allRecipes3.reverse();
      // const recipesInverted = state.recipesCopy.reverse();
      // const order = action.payload === "asc" ? allRecipes3 : recipesInverted;
      return {
        ...state,
        recipes: recipesInverted,
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
    case "SEARCH_BY_NAME":
      return {
        ...state,
        recipes: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_DETAIL":
      console.log(action.payload);
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
