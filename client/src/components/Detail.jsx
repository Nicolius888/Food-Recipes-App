import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../actions";

export default function Detail() {
  const dispatch = useDispatch();
  const detailState = useSelector((state) => state.detail);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  console.log(detailState);
  return (
    <div>
      {detailState.length > 0 ? (
        <h1>{detailState[0].name}</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
