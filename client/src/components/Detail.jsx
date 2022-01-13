import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, deleteDetail } from "../actions";

export default function Detail() {
  const dispatch = useDispatch();
  const detailState = useSelector((state) => state.detail);
  const { id } = useParams();

  const {
    name,
    Diets,
    img,
    resume,
    dishTypes,
    healtScore,
    score,
    steps,
    createdInDb,
  } = detailState;

  useEffect(() => {
    dispatch(deleteDetail());
    dispatch(getDetail(id));
  }, [dispatch]);

  return (
    <div>
      {detailState.id ? (
        <div key={id}>
          <h1>{name}</h1>
          <h2>
            {createdInDb ? Diets.map((e) => e).map((e) => e.name) : Diets}
          </h2>
          <img src={img} alt="img error" width="250px" height="150px" />
          <h3>Dish Types:{dishTypes}</h3>
          <h3>Healt Score:{healtScore}</h3>
          <h3>Score:{score}</h3>
          <div dangerouslySetInnerHTML={{ __html: resume }} />
          <p>Steps: {steps}</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <Link to="/home">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

// Diets.map((e) => e).map((e) => e.name)
