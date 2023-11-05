import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@mui/material";
import { setCurrentPage } from "../../redux/features/movies/moviesSlice";

const MoviePagination = ({ totalPages, currentPage, handleChange }) => {
  // const currentPage = useSelector((state) => state.movies.currentPage);

  // const dispatch = useDispatch();

  // const handleChange = (event, newPage) => {
  //   dispatch(setCurrentPage(newPage));
  // };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
      />
    </div>
  );
};

export default MoviePagination;
