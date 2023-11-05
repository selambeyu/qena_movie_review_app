import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SingleMovie from "../../components/movie/SingleMovie";
import { useGetMovieQuery } from "../../redux/features/api/movieSlice";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetReviewsQuery,
  useAddReviewMutation,
} from "../../redux/features/api/reviewsSlice";
import { Container } from "@mui/material";
import { Loading } from "../../components/Loading";
import Header from "../../components/Header";

export default function MovieDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  console.log("param", params);
  const {
    data: movie,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMovieQuery(params.movieId);
  const [
    addReview,
    {
      isLoading: isAddreviewLoading,
      isSuccess: isAddReviewSuccess,
      data,
      error: addreviewError,
      status,
    },
  ] = useAddReviewMutation();
  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isSuccess: isReviewsSuccess,
    isError: isReviewsError,
    error: reviewsError,
  } = useGetReviewsQuery(params.movieId);
  console.log("what is movieid here", movie);
  console.log("what is reviews", reviews);

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

  const handleAddReview = async (values) => {
    console.log("what is review value her", values);
    try {
      const loggedInUserdata = localStorage.getItem("userData");
      const userData = JSON.parse(loggedInUserdata);
      console.log("user", userData);

      values = {
        ...values,
        movie_id: params.movieId,
        user_id: userData.userId,
      };

      await addReview(values);

      toast.success("Review Added Successfully");
    } catch (error) {
      toast.error(`${error.detail}`);
    }
  };

  return (
    <>
      {" "}
      <Header
        searchText={searchText}
        selectedYear={selectedYear}
        handleSearchChange={handleSearchTextChang}
        onYearChange={handleSelectedYearChange}
        searchMovie={searchMovie}
      />{" "}
      <Container maxWidth="lg">
        {" "}
        {isLoading || isReviewsLoading ? (
          <Loading />
        ) : movie ? (
          <SingleMovie
            movie={movie}
            reviews={reviews.data}
            handleAddUseReview={handleAddReview}
          />
        ) : null}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Container>
    </>
  );
}
