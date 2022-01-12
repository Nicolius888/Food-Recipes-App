import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, deleteDetail } from "../actions";

export default function Detail() {
  const dispatch = useDispatch();
  const detailState = useSelector((state) => state.detail);
  const { id } = useParams();
  console.log(detailState);
  useEffect(() => {
    dispatch(deleteDetail());
    dispatch(getDetail(id));
  }, [dispatch]);

  return (
    <div>
      {detailState.id ? (
        <>
          <h1>{detailState.name}</h1>
          <h2>{detailState.diet}</h2>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

// Diets.map((e) => e).map((e) => e.name)
