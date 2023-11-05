import React from "react";
import { Box, Typography } from "@mui/material";

const NoDataAvailable = () => {
  return (
    <Box textAlign="center" py={5}>
      <Typography variant="h6">No Data Available</Typography>
    </Box>
  );
};

export default NoDataAvailable;
