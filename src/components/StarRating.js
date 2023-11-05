import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating } from "@mui/material";

function StarRating({ rating, handleRatingChange }) {
  return (
    <Rating
      name="star-rating"
      value={rating}
      precision={1}
      onChange={handleRatingChange}
      emptyIcon={<StarBorderIcon fontSize="inherit" />}
      icon={<StarIcon fontSize="inherit" style={{ color: "gold" }} />}
    />
  );
}

export default StarRating;
