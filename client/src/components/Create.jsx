import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postRecipe } from "../actions";
import styles from "./Create.module.css";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const typesState = useSelector((state) => state.types);
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    resume: "",
    score: "",
    healtScore: "",
    steps: "",
    img: "",
    dishTypes: [],
    diets: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleDishCheckbox(e) {
    let newArray = [...input.dishTypes];
    if (e.target.checked) {
      newArray.push(e.target.value);
    } else {
      newArray = newArray.filter((item) => item !== e.target.value);
    }
    setInput({
      ...input,
      dishTypes: newArray,
    });
  }

  function handleDietCheckbox(e) {
    let newArray2 = [...input.diets];
    if (e.target.checked) {
      newArray2.push(e.target.value);
    } else {
      newArray2 = newArray2.filter((item) => item !== e.target.value);
    }
    setInput({
      ...input,
      dishTypes: newArray2,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Recipe created!");
    setInput({
      name: "",
      resume: "",
      score: "",
      healtScore: "",
      steps: "",
      img: "",
      dishTypes: [],
      diets: [],
    });
    navigate("/home");
  }

  function isValidURL(str) {
    var regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "● The recipe requires a Name to bo created ●";
    } else if (!input.resume) {
      errors.resume = "● Please, make a short description of the plate ●";
    } else if (
      !Number.isInteger(input.score) &&
      input.score < 0 &&
      input.score > 100
    ) {
      errors.score = "● Give it a score from 0 to 100 :) ●";
    } else if (
      !Number.isInteger(input.healtScore) &&
      input.healtScore < 0 &&
      input.healtScore > 100
    ) {
      errors.healtScore = "● From 0 to 100, how healty is this recipe? ●";
    } else if (!input.steps) {
      errors.steps = "● Please, describe a few basics steps... ●";
    } else if (isValidURL(input.img)) {
      errors.img = "● This has to be a link to an image of the plate ●";
    }
    return errors;
  }

  return (
    <div>
      <h1>Add a new recipe</h1>

      <form>
        <div className={styles}>
          <label>Name:&#160;</label>
          <input
            type="text"
            placeholder="name..."
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Resume:&#160;</label>
          <input
            type="text"
            placeholder="resume..."
            value={input.resume}
            name="resume"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.resume && <p className="error">{errors.resume}</p>}
        </div>
        <div>
          <label>Score&#160;</label>
          <input
            type="text"
            placeholder="score..."
            value={input.score}
            name="score"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.score && <p className="error">{errors.score}</p>}
        </div>
        <div>
          <label>Healty Score:&#160;</label>
          <input
            type="text"
            placeholder="healty score..."
            value={input.healtScore}
            name="healtScore"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.healtScore && <p className="error">{errors.healtScore}</p>}
        </div>
        <div>
          <label>Steps:&#160;</label>
          <input
            type="text"
            placeholder="steps..."
            value={input.steps}
            name="steps"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.steps && <p className="error">{errors.steps}</p>}
        </div>
        <div>
          <label>Image:&#160;</label>
          <input
            type="text"
            placeholder="url..."
            value={input.img}
            name="img"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.img && <p className="error">{errors.img}</p>}
        </div>
        <div>
          <label>Type/s of diet:&#160;</label>
          <label>
            <input
              type="checkbox"
              value="vegetarian"
              name="diets"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Vegetarian&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="ketogenic"
              name="ketogenic"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Ketogenic&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="gluten free"
              name="gluten free"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Gluten free&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="dairy free"
              name="dairy free"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Dairy free&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="lacto ovo vegetarian"
              name="lacto ovo vegetarian"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Lacto ovo vegetarian&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="vegan"
              name="vegan"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Vegan&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="paleolithic"
              name="paleolithic"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Paleolithic&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="primal"
              name="primal"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Primal&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="pescatarian"
              name="pescatarian"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Pescatarian&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="fodmap friendly"
              name="fodmap friendly"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Fodmap friendly&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="whole 30"
              name="whole 30"
              onClick={(e) => handleDietCheckbox(e)}
            />
            Whole 30&#160;
          </label>
        </div>
        <div>
          <label>Type/s of dish:&#160;</label>
          <label>
            <input
              type="checkbox"
              value="side dish"
              name="side dish"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            side dish
          </label>
          <label>
            <input
              type="checkbox"
              value="lunch"
              name="lunch"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            lunch
          </label>
          <label>
            <input
              type="checkbox"
              value="main course"
              name="main course"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            main course
          </label>
          <label>
            <input
              type="checkbox"
              value="main dish"
              name="main dish"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            main dish
          </label>
          <label>
            <input
              type="checkbox"
              value="dinner"
              name="dinner"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            dinner
          </label>
          <label>
            <input
              type="checkbox"
              value="morning meal"
              name="morning meal"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            morning meal
          </label>
          <label>
            <input
              type="checkbox"
              value="brunch"
              name="brunch"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            brunch
          </label>
          <label>
            <input
              type="checkbox"
              value="breakfast"
              name="breakfast"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            breakfast
          </label>
          <label>
            <input
              type="checkbox"
              value="soup"
              name="soup"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            soup
          </label>
          <label>
            <input
              type="checkbox"
              value="salad"
              name="salad"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            salad
          </label>
          <label>
            <input
              type="checkbox"
              value="condiment"
              name="condiment"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            condiment
          </label>
          <label>
            <input
              type="checkbox"
              value="dip"
              name="dip"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            dip
          </label>
          <label>
            <input
              type="checkbox"
              value="sauce"
              name="sauce"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            sauce
          </label>
          <label>
            <input
              type="checkbox"
              value="spread"
              name="spread"
              onClick={(e) => handleDishCheckbox(e)}
            ></input>
            spread
          </label>
        </div>
      </form>
      <Link to="/home">
        <button>Back to home</button>
      </Link>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </div>
  );
}
