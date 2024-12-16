/* eslint-disable react/prop-types */

import { Box, Typography } from "@mui/material";

const NoResults = ({ message }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      bgcolor="#f9f9f9"
      textAlign="center"
      p={3}
    >
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default NoResults;
