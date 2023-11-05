import { Box, Card, Container, Divider, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegisterUser } from "../../components/user/AddUser";
import { useAddNewUserMutation } from "../../redux/features/api/userSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const AddUserPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addNewUser, { isLoading }] = useAddNewUserMutation();

  const [searchText, setSearchText] = useState(null);

  const handleSearchTextChang = (e) => {
    setSearchText(e.target.value);
  };

  const searchMovie = () => {
    navigate(`/search?q=${searchText}`);
  };

  const addUser = async (values) => {
    try {
      setIsSubmitting(true);
      const resp = await addNewUser(values).unwrap();
      toast.success("User Registered Successfully!");
      const userData = JSON.stringify(resp);
      localStorage.setItem("userData", userData);

      setIsSubmitting(false);

      navigate("/");
    } catch (error) {
      toast.error(`${error.detail}`);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header
        handleSearchChange={handleSearchTextChang}
        searchMovie={searchMovie}
      />
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">Register</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <RegisterUser
                handleAddUser={addUser}
                isSubmitting={isSubmitting}
              />
            </Box>
            <Divider sx={{ my: 3 }} />
          </Card>
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
};

export default AddUserPage;
