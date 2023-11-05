import PropTypes from "prop-types";
import { Avatar, Box, Typography } from "@mui/material";
import StarRating from "../StarRating";

export const MovieReview = (props) => {
  const {
    reviewId,
    username,
    movieId,
    rating,
    comment,
    userId,
    replies,
    created_at,
    ...other
  } = props;

  return (
    <Box
      sx={{
        display: "flex",
        pb: 3,
      }}
      {...other}
    >
      <Avatar src="" />
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "neutral.900" : "neutral.100",
          borderRadius: 1,
          ml: 2,
          p: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            alignItems: "flex-start",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography color="textPrimary" variant="body1">
            {username}
          </Typography>
          <Typography color="textSecondary" variant="caption"></Typography>
        </Box>
        <StarRating rating={rating} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {comment}
        </Typography>
        {replies.length > 0 && (
          <Box sx={{ pl: 2, borderLeft: "1px solid #ccc" }}>
            {replies.map((reply) => (
              <MovieReview key={reply.reviewId} {...reply} />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

MovieReview.propTypes = {
  rating: PropTypes.number.isRequired,
  username: PropTypes.string,
  reviewId: PropTypes.string,
  userId: PropTypes.string,
  movieId: PropTypes.string,
  replies: PropTypes.array,
  comment: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};
