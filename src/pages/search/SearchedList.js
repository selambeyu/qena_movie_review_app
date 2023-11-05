import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { MovieList } from "../../components/movie/MovieList";
import { Box, Stack, Container, Typography } from "@mui/material";
import { useGetSearchedMoviesQuery } from "../../redux/features/api/movieSlice";
import { useSearchParams } from "react-router-dom";
import MoviePagination from "../../components/movie/movies-pagination";
import { Loading } from "../../components/Loading";
import NoDataAvailable from "../../components/NoDataAvailable";

export default function SearchedListPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const titleparam = searchParams.get("q");
  const yearParam = searchParams.get("year");

  const [searchText, setSearchText] = useState(undefined);
  const [selectedYear, setSelectedYear] = useState(null);

  const {
    data: moviesList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSearchedMoviesQuery(titleparam);
  console.log("what is param her", yearParam, titleparam);
  const totalPages = moviesList ? Math.ceil(moviesList.total / rowsPerPage) : 0;
  console.log("movie list", moviesList);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleSearchTextChang = (e) => {
    console.log("what is e", e);
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
        searchMovie={searchMovie}
        searchText={searchText}
        selectedYear={selectedYear}
        onYearChange={handleSelectedYearChange}
        handleSearchChange={handleSearchTextChang}
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
          <Stack> </Stack>
          <Stack>
            <Typography variant="h4" align="center">
              {" "}
              Search Results
            </Typography>

            {isLoading ? (
              <Loading />
            ) : moviesList.total === 0 ? (
              <NoDataAvailable />
            ) : moviesList ? (
              <MovieList movies={moviesList.data} />
            ) : null}

            {/* <MoviePagination
              currentPage={page}
              totalPages={totalPages}
              handleChange={handlePageChange}
            /> */}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
