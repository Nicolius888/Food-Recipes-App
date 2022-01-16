import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postRecipe } from "../actions";
import styles from "./Create.module.css";

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [errors, setErrors] = useState({
    name: "",
    resume: "",
    score: "",
    healtScore: "",
    steps: "",
    img: "",
    dishTypes: "",
    diets: "",
  });
  const [input, setInput] = useState({
    name: "",
    resume: "",
    score: "",
    healtScore: "",
    steps: [],
    img: "",
    dishTypes: [],
    diets: [],
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleNameChange(e) {
    console.log(e.target.value);
    if (e.target.value.length < 5)
      setErrors({
        ...errors,
        name: "● The name has to be 5 or more characters long ●",
      });
    else
      setErrors({
        ...errors,
        name: "",
      });
    setInput({
      ...input,
      name: e.target.value,
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleResumeChange(e) {
    console.log(e.target.value);
    if (e.target.value.length < 10)
      setErrors({
        ...errors,
        resume:
          "● Please, make description of the plate in 10 characters or more ●",
      });
    else
      setErrors({
        ...errors,
        resume: "",
      });
    setInput({
      ...input,
      resume: e.target.value,
    });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleScoreChange(e) {
    console.log(e.target.value);
    if (e.target.value === "") {
      setErrors({
        ...errors,
        score: "● Please, select a score ●",
      });
    } else {
      setErrors({
        ...errors,
        score: "",
      });
      setInput({
        ...input,
        score: e.target.value,
      });
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleHealtScoreChange(e) {
    console.log(e.target.value);
    if (e.target.value === "") {
      setErrors({
        ...errors,
        healtScore: "● Please, select a healty score ●",
      });
    } else {
      setErrors({
        ...errors,
        healtScore: "",
      });
      setInput({
        ...input,
        healtScore: e.target.value,
      });
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  function isValidURL(str) {
    var regexp =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  function handleImgChange(e) {
    console.log(e.target.value);
    if (isValidURL(`${e.target.value}`) === false)
      setErrors({
        ...errors,
        img: "● Please, insert a valid URL ●",
      });
    else
      setErrors({
        ...errors,
        img: "",
      });
    setInput({
      ...input,
      img: e.target.value,
    });
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleDietCheckbox(e) {
    if (e.target.checked === true) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
      setErrors({
        ...errors,
        diets: "",
      });
    } else if (e.target.checked === false) {
      setInput({
        ...input,
        diets: input.diets.filter((diet) => diet !== e.target.value),
      });
      validateDiet();
    }
  }

  function validateDiet() {
    //this has to be validated outside the mean handle, to read the actual scope of the state...
    if (input.diets.length === 1) {
      setErrors({
        ...errors,
        diets: "● Please, select at least one diet type ●",
      });
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  function handleDishCheckbox(e) {
    if (e.target.checked === true) {
      setInput({
        ...input,
        dishTypes: [...input.dishTypes, e.target.value],
      });
      setErrors({
        ...errors,
        dishTypes: "",
      });
    } else if (e.target.checked === false) {
      setInput({
        ...input,
        dishTypes: input.dishTypes.filter((dish) => dish !== e.target.value),
      });
      validateDish();
    }
  }

  function validateDish() {
    //this has to be validated outside the mean handle, to read the state in the global scope...
    if (input.dishTypes.length === 1) {
      setErrors({
        ...errors,
        dishTypes: "● Please, select at least one dish type ●",
      });
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [step, setStep] = useState("");

  function handleStepInput(e) {
    setStep(`${e.target.value}`);
  }

  function handleAddStep(e) {
    e.preventDefault();
    if (step === "") return;
    setInput({
      ...input,
      steps: [...input.steps, step],
    });
    setStep("");
    validateSteps();
  }

  function handleDeleteStep(e, step) {
    e.preventDefault();
    setInput({
      ...input,
      steps: input.steps.filter((e) => e !== step),
    });
    console.log(input.steps);
    validateSteps();
  }

  function validateSteps() {
    //this has to be validated outside the mean handle, to read the state in the global scope...
    if (input.steps.length < 2) {
      setErrors({
        ...errors,
        steps: "● Please, describe at least 3 steps to make the recipe ●",
      });
    } else {
      setErrors({
        ...errors,
        steps: "",
      });
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            onChange={(e) => handleNameChange(e)}
          ></input>
          {errors.name && <h6 className="error">{errors.name}</h6>}
        </div>
        {/*/////////////////////////////////////////////////////////////////////*/}
        <div>
          <label>Resume:&#160;</label>
          <input
            type="text"
            placeholder="resume..."
            value={input.resume}
            name="resume"
            onChange={(e) => handleResumeChange(e)}
          ></input>
          {errors.resume && <h6 className="error">{errors.resume}</h6>}
        </div>
        {/*/////////////////////////////////////////////////////////////////////*/}
        <div>
          <label>Score:&#160;</label>
          <select onChange={(e) => handleScoreChange(e)}>
            <option value="">--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          {errors.score && <h6 className="error">{errors.score}</h6>}
        </div>
        {/*/////////////////////////////////////////////////////////////////////*/}
        <div>
          <label>Heatly Score:&#160;</label>
          <select onChange={(e) => handleHealtScoreChange(e)}>
            <option value="">--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          {errors.healtScore && <h6 className="error">{errors.healtScore}</h6>}
        </div>
        {/*/////////////////////////////////////////////////////////////////////*/}
        <div>
          <label>Steps:&#160;</label>
          <input
            type="text"
            placeholder="add steps..."
            name="stepAdd"
            value={step}
            onChange={(e) => handleStepInput(e)}
          ></input>
          <button type="submit" onClick={(e) => handleAddStep(e)}>
            Add
          </button>
          {input.steps.length &&
            input.steps.map((step) => {
              return (
                <Fragment key={step}>
                  <p>
                    {step}
                    <button onClick={(e) => handleDeleteStep(e, step)}>
                      x
                    </button>
                  </p>
                </Fragment>
              );
            })}
          {errors.steps && <h6 className="error">{errors.steps}</h6>}
        </div>
        {/*/////////////////////////////////////////////////////////////////////*/}

        <div>
          <label>Image:&#160;</label>
          <input
            type="text"
            placeholder="url..."
            value={input.img}
            name="img"
            onChange={(e) => handleImgChange(e)}
          ></input>
          {/* <input type="image" id="image" alt="m" src={input.img}></input> */}
          {errors.img && <h6 className="error">{errors.img}</h6>}
        </div>
        {/*/////////////////////////////////////////////////////////////////////*/}
        <div>
          <label>Type/s of diet:&#160;</label>
          <label>
            <input
              type="checkbox"
              value="vegetarian"
              name="diets"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Vegetarian&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="ketogenic"
              name="ketogenic"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Ketogenic&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="gluten free"
              name="gluten free"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Gluten free&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="dairy free"
              name="dairy free"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Dairy free&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="lacto ovo vegetarian"
              name="lacto ovo vegetarian"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Lacto ovo vegetarian&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="vegan"
              name="vegan"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Vegan&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="paleolithic"
              name="paleolithic"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Paleolithic&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="primal"
              name="primal"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Primal&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="pescatarian"
              name="pescatarian"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Pescatarian&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="fodmap friendly"
              name="fodmap friendly"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Fodmap friendly&#160;
          </label>
          <label>
            <input
              type="checkbox"
              value="whole 30"
              name="whole 30"
              onChange={(e) => handleDietCheckbox(e)}
            />
            Whole 30&#160;
          </label>
          {errors.diets && <h6 className="error">{errors.diets}</h6>}
        </div>
        {/*/////////////////////////////////////////////////////////////////////*/}
        <div>
          <label>Type/s of dish:&#160;</label>
          <label>
            <input
              type="checkbox"
              value="side dish"
              name="side dish"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            side dish
          </label>
          <label>
            <input
              type="checkbox"
              value="lunch"
              name="lunch"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            lunch
          </label>
          <label>
            <input
              type="checkbox"
              value="main course"
              name="main course"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            main course
          </label>
          <label>
            <input
              type="checkbox"
              value="main dish"
              name="main dish"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            main dish
          </label>
          <label>
            <input
              type="checkbox"
              value="dinner"
              name="dinner"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            dinner
          </label>
          <label>
            <input
              type="checkbox"
              value="morning meal"
              name="morning meal"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            morning meal
          </label>
          <label>
            <input
              type="checkbox"
              value="brunch"
              name="brunch"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            brunch
          </label>
          <label>
            <input
              type="checkbox"
              value="breakfast"
              name="breakfast"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            breakfast
          </label>
          <label>
            <input
              type="checkbox"
              value="soup"
              name="soup"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            soup
          </label>
          <label>
            <input
              type="checkbox"
              value="salad"
              name="salad"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            salad
          </label>
          <label>
            <input
              type="checkbox"
              value="condiment"
              name="condiment"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            condiment
          </label>
          <label>
            <input
              type="checkbox"
              value="dip"
              name="dip"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            dip
          </label>
          <label>
            <input
              type="checkbox"
              value="sauce"
              name="sauce"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            sauce
          </label>
          <label>
            <input
              type="checkbox"
              value="spread"
              name="spread"
              onChange={(e) => handleDishCheckbox(e)}
            ></input>
            spread
          </label>
          {errors.dishTypes.length ? (
            <h6 className="error">{errors.dishTypes}</h6>
          ) : null}
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
