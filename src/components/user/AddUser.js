import * as Yup from "yup";

import { useFormik } from "formik";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

export const RegisterUser = ({ isSubmitting, handleAddUser }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      username: Yup.string().required("Username is required"),
    }),
    onSubmit: async (values, helpers) => {
      handleAddUser(values);
    },
  });

  return (
    <div>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          mt: 2,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Divider orientation="horizontal" />
        </Box>
      </Box>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          autoComplete="off"
          helperText={formik.touched.email && formik.errors.email}
          label="Email Address"
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
        />
        <TextField
          error={Boolean(formik.touched.username && formik.errors.username)}
          fullWidth
          helperText={formik.touched.username && formik.errors.username}
          label="User Name"
          margin="normal"
          name="username"
          autoComplete="off"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: -1,
            mt: 2,
          }}
        ></Box>

        <Box sx={{ mt: 2 }}>
          <Button
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            {isSubmitting ? (
              <CircularProgress sx={{ color: "secondary" }} size={24} />
            ) : (
              "Register"
            )}
          </Button>
        </Box>
      </form>
    </div>
  );
};
