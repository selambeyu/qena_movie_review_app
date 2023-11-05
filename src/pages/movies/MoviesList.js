import React, { useEffect, useState } from "react";
import { Container, Box, Stack, Typography } from "@mui/material";
import { MovieList } from "../../components/movie/MovieList";
import Header from "../../components/Header";
import MoviePagination from "../../components/movie/movies-pagination";
import { useNavigate } from "react-router-dom";
import { useGetMoviesQuery } from "../../redux/features/api/movieSlice";
import { Loading } from "../../components/Loading";
import NoDataAvailable from "../../components/NoDataAvailable";

function MoviesListPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [pageno, setPageno] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    data: moviesList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMoviesQuery(pageno, rowsPerPage);

  const totalPages = moviesList ? Math.ceil(moviesList.total / rowsPerPage) : 0;

  const handlePageChange = (event, newPage) => {
    setPageno(newPage);
  };

  const handleSearchTextChang = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelectedYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const searchMovie = () => {
    console.log("search tex", searchText);
    console.log("search year", selectedYear);
    navigate(`/search?q=${searchText}`);
  };

  return (
    <>
      <Header
        searchText={searchText}
        selectedYear={selectedYear}
        onYearChange={handleSelectedYearChange}
        handleSearchChange={handleSearchTextChang}
        searchMovie={searchMovie}
      />

      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack>
            <Typography variant="h1" align="center">
              {" "}
              Movies
            </Typography>
            {isLoading ? (
              <Loading />
            ) : moviesList.total === 0 ? (
              <NoDataAvailable />
            ) : moviesList.total > 0 ? (
              <>
                {" "}
                <MovieList movies={moviesList.data} />
                <MoviePagination
                  currentPage={pageno}
                  totalPages={totalPages}
                  handleChange={handlePageChange}
                />
              </>
            ) : null}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default MoviesListPage;
