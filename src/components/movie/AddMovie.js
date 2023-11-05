import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { PosterUploader } from "../PosterUploader";

const categoryOptions = [
  {
    label: "Series",
    value: "series",
  },
  {
    label: "Movie",
    value: "movie",
  },
  {
    label: "Drama",
    value: "drama",
  },
  {
    label: "Comedy",
    value: "comedy",
  },
  {
    label: "Romance",
    value: "romance",
  },
  {
    label: "Documentary",
    value: "documentary",
  },
];

export const AddMovie = ({ onAddMovie, loading }) => {
  const [featureImage, setFeatureImage] = useState([]);
  const [imageView, setImageView] = useState(undefined);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formData = new FormData();
  const formik = useFormik({
    initialValues: {
      Title: "",
      Year: "",
      Runtime: "",
      Type: "",
      Plot: "",
      Poster: {},
      Language: "",
      Writer: "",
      Actors: "",
      Genre: "",
      Director: "",
    },
    validationSchema: Yup.object({
      Title: Yup.string().max(255).required(),
      Year: Yup.string().required(),
      Runtime: Yup.string().required(),
      Type: Yup.string().required(),
      Plot: Yup.string().required(),
      // Poster: Yup.().required(),
      Language: Yup.string().required(),
      Writer: Yup.string().required(),
      Actors: Yup.string().required(),
      Genre: Yup.string().required(),
      Director: Yup.string().required(),
    }),
    onSubmit: async (values, helpers) => {
      console.log("what is poster image her", featureImage[0]);
      // formik.setFieldValue("Poster", featureImage[0]);
      // const formData = new FormData();
      formData.append("Poster", values.Poster);
      formData.append("Title", values.Title);
      formData.append("Year", values.Year);
      formData.append("Runtime", values.Runtime);
      formData.append("Genre", values.Genre);
      formData.append("Director", values.Director);
      formData.append("Writer", values.Writer);
      formData.append("Actors", values.Actors);
      formData.append("Plot", values.Plot);
      formData.append("Language", values.Language);
      formData.append("Type", values.Type);
      console.log("form data", formData);
      // return;
      onAddMovie(values, helpers);
    },
  });

  const handleFeatureImageDrop = (newFiles) => {
    console.log("newfiles", newFiles);
    setFeatureImage((prevFeatureImage) => [...prevFeatureImage, ...newFiles]);
    formik.setFieldValue("Poster", [newFiles[0]]);
    const file = newFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageView(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    console.log("image hear", featureImage);
  };

  const handleFeatureImageRemove = (file) => {
    setFeatureImage((prevFeatureImage) =>
      prevFeatureImage.filter((_file) => _file.path !== file.path)
    );
    setImageView(null);
  };

  const handleFeatureImageRemoveAll = () => {
    setFeatureImage([]);
    setImageView(null);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Basic Details</Typography>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  margin="dense"
                  id="Title"
                  error={Boolean(formik.touched.Title && formik.errors.Title)}
                  fullWidth
                  helperText={formik.touched.Title && formik.errors.Title}
                  label="Movie Title"
                  name="Title"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Title}
                />
                <TextField
                  margin="dense"
                  error={Boolean(formik.touched.Type && formik.errors.Type)}
                  fullWidth
                  label="Movie Type"
                  name="Type"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  select
                  value={formik.values.Type}
                >
                  {categoryOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  margin="dense"
                  id="Writer"
                  error={Boolean(formik.touched.Writer && formik.errors.Writer)}
                  fullWidth
                  helperText={formik.touched.Writer && formik.errors.Writer}
                  label="Writer"
                  name="Writer"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Writer}
                />
                <TextField
                  margin="dense"
                  id="Director"
                  error={Boolean(
                    formik.touched.Director && formik.errors.Director
                  )}
                  fullWidth
                  helperText={formik.touched.Director && formik.errors.Director}
                  label="Director"
                  name="Director"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Director}
                />
                <TextField
                  margin="dense"
                  id="Actors"
                  error={Boolean(formik.touched.Actors && formik.errors.Actors)}
                  fullWidth
                  helperText={formik.touched.Actors && formik.errors.Actors}
                  label="Actors"
                  name="Actors"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Actors}
                />
                <TextField
                  fullWidth
                  multiline
                  name="Plot"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Plot}
                  placeholder="Plot"
                  rows={3}
                  error={Boolean(formik.touched.Plot && formik.errors.Plot)}
                  helperText={formik.touched.Plot && formik.errors.Plot}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  margin="dense"
                  error={Boolean(formik.touched.Genre && formik.errors.Genre)}
                  fullWidth
                  helperText={formik.touched.Genre && formik.errors.Genre}
                  label="Genre"
                  name="Genre"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Genre}
                />
                <TextField
                  margin="dense"
                  error={Boolean(formik.touched.Year && formik.errors.Year)}
                  fullWidth
                  helperText={formik.touched.Year && formik.errors.Year}
                  label="Year"
                  name="Year"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Year}
                />
                <TextField
                  margin="dense"
                  error={Boolean(
                    formik.touched.Language && formik.errors.Language
                  )}
                  fullWidth
                  helperText={formik.touched.Language && formik.errors.Language}
                  label="Language"
                  name="Language"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Language}
                />
                <TextField
                  margin="dense"
                  error={Boolean(
                    formik.touched.Runtime && formik.errors.Runtime
                  )}
                  fullWidth
                  helperText={formik.touched.Runtime && formik.errors.Runtime}
                  label="Runtime"
                  // type="number"
                  name="Runtime"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.Runtime}
                />
              </Grid>
              <Grid item md={4}>
                {" "}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs={12}>
                <Typography variant="h6">Upload Poster Image</Typography>
                <Typography
                  color="textSecondary"
                  variant="body2"
                  sx={{ mt: 1 }}
                ></Typography>
              </Grid>
              <Grid item md={8} xs={12}>
                {/* <div>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image"
                    name="image"
                    type="file"
                    onChange={(event) => {
                      formik.setFieldValue(
                        "Poster",
                        event.currentTarget.files[0]
                      );
                    }}
                  />
                  <label htmlFor="image">
                    <Button variant="contained" component="span">
                      Upload Image
                    </Button>
                  </label>
                  <span>
                    {formik.values.Poster && formik.values.Poster.name}
                  </span>
                </div> */}
                <PosterUploader
                  accept="image/*"
                  imagePreview={imageView}
                  isLoading={isImageLoading}
                  files={featureImage}
                  // onUpload={handleFeatureImageUpload}
                  onDrop={handleFeatureImageDrop}
                  onRemove={handleFeatureImageRemove}
                  onRemoveAll={handleFeatureImageRemoveAll}
                />
              </Grid>
              <Grid item md={4} xs={12}></Grid>
              <Grid item md={8} xs={12}>
                {" "}
                <Button disabled={loading} variant="contained" type="submit">
                  {loading ? (
                    <CircularProgress sx={{ color: "secondary" }} size={24} />
                  ) : (
                    "Add Movie"
                  )}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <div>
          <Toaster containerStyle={{ marginTop: "2.5rem" }} />
        </div>
      </form>
    </>
  );
};
