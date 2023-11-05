import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { ToastContainer, toast } from "react-toastify";
import { AddMovie } from "../../components/movie/AddMovie";
import { useState } from "react";
import { useAddMovieMutation } from "../../redux/features/api/movieSlice";
import Header from "../../components/Header";

export default function AddMoviePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addMovie, { isLoading }] = useAddMovieMutation();
  const [searchText, setSearchText] = useState(null);
  const navigate = useNavigate();

  const handleSearchTextChang = (e) => {
    setSearchText(e.target.value);
  };

  const searchMovie = () => {
    navigate(`/search?q=${searchText}`);
  };

  const handleAddMovie = async (values, helpers) => {
    try {
      setIsSubmitting(true);
      console.log("value add movie", values);

      return;
      const resp = await addMovie(values);
      console.log("respons", resp);
      toast.success("succes added movie");
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.log("err", error);
      toast.error(`${error.detail}`);
    }
  };

  return (
    <>
      <Header
        handleSearchChange={handleSearchTextChang}
        searchText={searchText}
        searchMovie={searchMovie}
      />
      <Box component="main">
        <Container maxWidth="lg">
          <Stack spacing={1}>
            <div>
              <Box sx={{ mb: 4 }}></Box>
              <AddMovie onAddMovie={handleAddMovie} loading={isSubmitting} />
            </div>
          </Stack>
        </Container>
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
      </Box>
    </>
  );
}
