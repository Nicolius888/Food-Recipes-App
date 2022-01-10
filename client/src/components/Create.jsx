import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postRecipe } from "../actions";

export default function Create() {
  const dispatch = useDispatch();
  const typesState = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    resume: "",
    score: "",
    healtScore: "",
    steps: "",
    img: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div>
      <h1>Add a new recipe</h1>

      <form>
        <div>
          <label>Name:&#160;</label>
          <input type="text" value={input.name} name="name"></input>
        </div>
        <div>
          <label>Resume:&#160;</label>
          <input type="text" value={input.resume} name="resume"></input>
        </div>
        <div>
          <label>Score&#160;</label>
          <input type="text" value={input.score} name="score"></input>
        </div>
        <div>
          <label>Healty Score:&#160;</label>
          <input type="text" value={input.healtScore} name="healtScore"></input>
        </div>
        <div>
          <label>Steps:&#160;</label>
          <input type="text" value={input.steps} name="steps"></input>
        </div>
        <div>
          <label>Image:&#160;</label>
          <input type="text" value={input.img} name="img"></input>
        </div>
        <div>
          <label>Type/s of diet:&#160;</label>
          <label>
            <input type="checkbox" value="diets" name="diets" />
            Vegetarian&#160;
          </label>
          <label>
            <input type="checkbox" value="ketogenic" name="ketogenic" />
            Ketogenic&#160;
          </label>
          <label>
            <input type="checkbox" value="gluten free" name="gluten free" />
            Gluten free&#160;
          </label>
          <label>
            <input type="checkbox" value="dairy free" name="dairy free" />
            Dairy free&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="lacto ovo vegetarian"
              name="lacto ovo vegetarian"
            />
            Lacto ovo vegetarian&#160;
          </label>
          <label>
            <input type="checkbox" value="vegan" name="vegan" />
            Vegan&#160;
          </label>
          <label>
            <input type="checkbox" value="paleolithic" name="paleolithic" />
            Paleolithic&#160;
          </label>
          <label>
            <input type="checkbox" value="primal" name="primal" />
            Primal&#160;
          </label>
          <label>
            <input type="checkbox" value="pescatarian" name="pescatarian" />
            Pescatarian&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="fodmap friendly"
              name="fodmap friendly"
            />
            Fodmap friendly&#160;
          </label>
          <label>
            <input type="checkbox" value="whole 30" name="whole 30" />
            Whole 30&#160;
          </label>
        </div>
      </form>
      <Link to="/home">
        <button>Back to home</button>
      </Link>
      <button type="submit ">Submit</button>
    </div>
  );
}
