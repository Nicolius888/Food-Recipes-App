const initialState = {
  recipes: [],
  recipesCopy: [],
  /////////////////////
  actualOrder: "asc",
  ////////////////////
  currentPage: 1,
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      let getRecipes = action.payload;
      getRecipes.map(
        (e) =>
          e.Diets = e.Diets.map((e) => e.name)// this is to adapt the format of the created by user diets
      );
      //preguntar si tengo algun filtro/estado global para cuado vuelvo del detail o lo que fuere
      //siguen funcionando filtros aplicados
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
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "INVERT_ORDER":
      return {
        ...state,
        recipes: state.recipes.reverse(),
        actualOrder: action.payload,
      };
    case "FILTER_BY_DIETS":
      let allRecipes = state.recipesCopy;
      const dietFilter =
        action.payload === "all"
          ? allRecipes
          : allRecipes.filter((recipe) =>
              recipe.Diets.includes(action.payload)//filter when match the diet
            );
      dietFilter.sort(function (a, b) {  //re-order from a to z
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      let orderedRecipes =
        state.actualOrder === "asc" ? dietFilter : dietFilter.reverse();//to match the actual filter i guess
      return {
        ...state,
        recipes: orderedRecipes,
      };
    case "FILTER_BY_SCORE": 
      const allRecipes2 = state.recipesCopy;
      const scoreFilter =
        action.payload === "all"
          ? allRecipes2
          : allRecipes2.filter((recipe) => recipe.score == action.payload); //check this because now tha API just have healty score -use-> recipe.healthScore

      // const mayor =
      //   action.payload === "mayor" &&
      //   allRecipes2.sort(function (a, b) {
      //     var nameA = a.score;
      //     var nameB = b.score;
      //     if (nameA < nameB) {
      //       return -1;
      //     }
      //     if (nameA > nameB) {
      //       return 1;
      //     }
      //     return 0;
      //   });

      // const menor =
      //   action.payload === "menor" &&
      //   allRecipes2.sort(function (a, b) {
      //     var nameA = a.score;
      //     var nameB = b.score;
      //     if (nameA < nameB) {
      //       return 1;
      //     }
      //     if (nameA > nameB) {
      //       return -1;
      //     }
      //     return 0;
      //   });

      let orderedScore =
        state.actualOrder === "desc" ? scoreFilter.reverse() : scoreFilter;//check al this "orders check" at the end of all cases
      return {
        ...state,
        recipes: orderedScore,
      };
    case "SEARCH_BY_NAME":
      let getName = action.payload;
      getName.map(
        (e) =>(e.Diets = e.Diets.map((e) => e.name))
      );
      return {
        ...state,
        recipes: getName,
      };
    case "GET_DETAIL"://ok
      return {
        ...state,
        detail: action.payload,
      };
    case "DELETE_DETAIL"://ok
      return {
        ...state,
        detail: [],
      };
    default:
      return state;
  }
}
export default rootReducer;
