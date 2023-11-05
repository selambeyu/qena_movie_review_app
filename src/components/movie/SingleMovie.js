import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import { MovieReviewAdd } from "./movie-comment-add";
import { MovieReview } from "./movie-comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetUserDetailQuery } from "../../redux/features/api/userSlice";
import ImageView from "../ImageView";
import { Loading } from "../Loading";

const SingleMovie = ({ movie, reviews, handleAddUseReview }) => {
  const [reviewsWithUsernames, setReviewsWithUsernames] = useState([]);

  const loggedInUserdata = localStorage.getItem("userData");
  const userData = JSON.parse(loggedInUserdata);
  console.log("user", userData);
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserDetailQuery(userData.userId);

  const getUsernameByUserId = async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      console.log("userData", userData);
      return userData.username;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "Unknown User";
    }
  };

  useEffect(() => {
    const addUsernameToReviews = async () => {
      const updatedReviews = [];
      for (const review of reviews) {
        const username = await getUsernameByUserId(review.userId);
        updatedReviews.push({
          ...review,
          username,
        });
      }
      setReviewsWithUsernames(updatedReviews);
    };

    addUsernameToReviews();
  }, [reviews]);

  const renderMovieReviews = () => {
    return reviewsWithUsernames.map((comment) => (
      <MovieReview key={comment.reviewId} {...comment} />
    ));
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Link to="/">
            <Button startIcon={<ArrowBackIcon fontSize="small" />}>Back</Button>
          </Link>

          <Chip label={movie?.Type} />
          <Typography sx={{ mt: 3 }} variant="h3">
            {movie?.Title}
          </Typography>
          <Typography color="textSecondary" sx={{ mt: 3 }} variant="subtitle1">
            {movie.Plot}
          </Typography>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              mt: 3,
            }}
          >
            <Avatar />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2">By {movie.Writer} •</Typography>
            </Box>
          </Box>
          <ImageView imageUrl={movie.Poster} />

          <Divider />

          {renderMovieReviews()}

          <Divider sx={{ my: 3 }} />

          {/* {reviews.map((comment) => (
            <MovieReview key={comment.reviewId} {...comment} />
          ))} */}

          <MovieReviewAdd
            userName={user.username}
            addUserReview={handleAddUseReview}
          />
        </Container>
      </Box>
    </>
  );
};

export default SingleMovie;
