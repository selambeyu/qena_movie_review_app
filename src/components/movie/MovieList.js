import { format, subHours, subMinutes, subSeconds } from "date-fns";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const now = new Date();

const MovieReviewCardMediaWrapper = styled("div")({
  paddingTop: "calc(100% * 4 / 4)",
  position: "relative",
});

const LinkTypography = styled(Typography)`
  color: #010080;
  &:hover {
    cursor: pointer;
    color: gray;
  }
`;

const MovieInfoContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const MovieTitle = styled(Link)`
  text-decoration: none;
`;

export const MovieList = ({ movies }) => (
  <Box
    sx={{
      backgroundColor: "background.default",
      minHeight: "100%",
      p: 3,
    }}
  >
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid spacing={2} item key={movie.movieId} md={4} xs={12}>
          <Card
            sx={{
              //   height: "100%",
              p: 2,
            }}
          >
            <MovieReviewCardMediaWrapper>
              <CardMedia
                image={movie.Poster}
                sx={{
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  width: "100%",
                }}
              />
            </MovieReviewCardMediaWrapper>
            <Box sx={{ mt: 2 }}>
              <MovieTitle to={`/movies/${movie.movieId}`}>
                <Typography variant="h5">{movie.Title}</Typography>
              </MovieTitle>
              <MovieInfoContainer>
                <Chip
                  size="medium"
                  color="success"
                  label={movie.Type}
                  variant="outlined"
                />
                <Typography color="textSecondary" variant="body2">
                  {movie.Year}
                </Typography>
              </MovieInfoContainer>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);
