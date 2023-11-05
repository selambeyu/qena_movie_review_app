import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import StarRating from "../StarRating";
import * as Yup from "yup";

export const MovieReviewAdd = ({ addUserReview, userName }) => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
      rating: Yup.number().required(),
    }),
    onSubmit: async (values, helpers) => {
      addUserReview(values);
      helpers.resetForm();
    },
  });

  const handleRatingChange = (event, newValue) => {
    formik.setFieldValue("rating", newValue);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{
            height: 40,
            mr: 2,
            width: 40,
          }}
        ></Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography>{userName + "(you)"}</Typography>
          <StarRating
            rating={formik.values.rating}
            handleRatingChange={handleRatingChange}
          />

          {/* <ErrorMessage name="rating" component="div" /> */}

          <TextField
            margin="dense"
            id="comment"
            error={Boolean(formik.touched.comment && formik.errors.comment)}
            fullWidth
            helperText={formik.touched.comment && formik.errors.comment}
            name="comment"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.comment}
            multiline
            placeholder="Add a comment"
            rows={3}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
          />

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <div>
              <Button type="submit" sx={{ ml: 2 }} variant="contained">
                Send
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
