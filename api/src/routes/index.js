const { Router } = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // this works with dotenv package: npm i dotenv, //esto funciona con el paquete dotenv: npm i dotenv,
const API_KEY = process.env.API_KEY; // and, the .env file, indeed.
const { Recipe, Diet } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.use(
  cors({
    origin: "http://localhost:3001",
  })
);

//FUNCTIONS/GETS/FILTERS TO USE IN ROUTES:
//get api recipes //get recetas de la api
const getApiRecipes = async () => {
  const recipesGet = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  const recipesFiltered = await recipesGet.data.results.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      resume: recipe.summary,
      score: Math.round(recipe.spoonacularScore),
      healtScore: Math.round(recipe.healthScore),
      steps: recipe.analyzedInstructions,
      img: recipe.image,
      diet: recipe.diets,
    };
  });
  return recipesFiltered;
};

//only api diets // solo dietas de la api
const getDiets = async () => {
  //all api data //toda la data de la api
  const dietsGet = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
  );
  //this returns a "big" object with "little" objects each one with the array of diets of each recipe //esto devuelve un "objeto grande" con "objetos pequeños" cada uno con el array de dietas de cada receta
  const dietsFiltered = await dietsGet.data.results.map((types) => {
    return {
      type: types.diets.map((e) => e),
    };
  });
  //this is where we will push each type of diet only if it doesn's includes it //acá vamos a "pushear" cada tipo de dieta unicamente si todavia no esta en el array
  const allTypes = [];

  dietsFiltered.forEach((e) => {
    //for heach "little" object in the "big" one  // por cada "objeto pequeño" en el "objeto grande"
    e.type.forEach((e) => {
      // and for each type of diet in the "little" object // y por cada tipo de dieta en el "objeto pequeño"
      if (!allTypes.includes(e)) {
        //if it not exists in my allTypes array //si no existe en mi array allTypes
        allTypes.push(e); //push it. //pushealo
      }
      //and voilá we have all the diets, not repeated.  // y voilá tenemos todas las dietas, sin repetir.
    });
  });
  //this create the diets in the DB //aca creamos las dietas en la DB
  const create = async () => {
    allTypes.forEach((name) => {
      Diet.findOrCreate({ where: { name: name } }); //this has to be findOrCreate to do the create just ONCE.// esto tiene que ser findOrCreate para hacer el create solo UNA VEZ.
    });
    return allTypes;
  };
  //all this is to be used in /types route //todo esto es para usar el la ruta /types
  //lo que cambiaría seria que el get a la api se haga aparte del get types, xq la api da reqests limitados...
  return create();
};

//this find created in DB recipes //acá buscamos las recetas creadas en la DB
const findFoods = async () => {
  let total = await Recipe.findAll({
    include: {
      model: Diet,
      as: "Diets",
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return total;
};

//api recipes + DB created. //concatenamos las recetas de la api con las creadas en la DB
const getRecipes = async () => {
  const apiRecipes = await getApiRecipes();
  const dbFoods = await findFoods();
  const totalGet = apiRecipes.concat(dbFoods);
  return totalGet;
};

//ROUTES: //RUTAS:                    ///////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/recipes", async (req, res) => {
  const recipes = await getRecipes();
  const { name } = req.query;
  //recipes alphabetically sort by name //ordenamos las recetas por nombre alfabeticamente (metodo sort!)
  const recipesSort = await recipes.sort(function (a, b) {
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
  //if there is a name query, filter and send only that one. //si hay un query de nombre, filtramos y mandamos solo esa.
  if (name) {
    const nameSearch = await recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(name.toLowerCase())
    );
    if (nameSearch.length) {
      res.status(200).send(nameSearch);
    } else {
      res.status(404).send("Recipe not found, try again (◡‿◡*)");
    }
  } else {
    res.status(200).send(recipesSort);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  //same search logic, but with findOne //misma logica de busqueda anterior ,pero con findOne
  const recipe = await Recipe.findOne({
    where: { id },
  });
  if (recipe) {
    res.status(200).send(recipe);
  } else {
    res.status(404).send("Recipe not found, try again (◡‿◡*)");
  }
});

router.get("/types", async (req, res) => {
  const diets = await getDiets(); //remember that we do the logic up there // recordemos que hicimos la logica arriba
  res.status(200).json(diets);
});

router.post("/recipes", async (req, res) => {
  const { name, resume, score, healtScore, steps, img, createdInDb, diets } =
    req.body; //diets is an array with string of types of diets //diets es un array con strings de tipos de dietas

  const create = await Recipe.create({
    //create the recipe in the DB  //creamos la receta en la DB
    name,
    resume,
    score,
    healtScore,
    steps,
    img,
    createdInDb,
  });

  let dietIds = diets.map(
    async (dietName) => await Diet.findOne({ where: { name: dietName } }) //find diets by name, one by one, with map //buscamos dietas por nombre, una por una, con map
  );

  dietIds = await Promise.all(dietIds); //resolve it //resolvemos con promise.all

  dietIds = dietIds.map((diet) => diet.id); //filter the diets by id  //filtramos las dietas por id

  dietIds.map(async (id) => {
    //set the relationship by id, and add it to the recipe creator //seteamos la relacion por id, y la agregamos al creator de la receta
    await create.addDiet(id);
  });
  res.status(201).json(create); //return the "201 created", and the recipe created. //retornamos el "201 created", y la receta creada.
});

module.exports = router;

//the "search by id" steel only searches by UUID type of id...
