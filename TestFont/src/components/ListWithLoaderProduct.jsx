/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ProductCard from "./ProductCard"

const ListWithLoaderProduct = ({ items, isLoading, message = "Aucun élément trouvé." }) => {
  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          // bgcolor="#f9f9f9"
          p={2}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography variant="h6" color="textSecondary" mt={2}>
              Chargement en cours...
            </Typography>
          </Box>
        </Box>

      ) : items.length > 0 ? (
        <>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            gap={2}
            maxHeight="calc(100vh - 150px)"
            overflow="auto"
          >
            {items.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </>

      ) : (
        <Typography
          variant="h6"
          color="textSecondary"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          {message}
        </Typography>
      )}
    </>
  );
};

export default ListWithLoaderProduct;


{/* <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
  {items.map((item, index) => (
    <ListItem key={index} divider>
      <ListItemText primary={item.name} secondary={item.description} />
    </ListItem>
  ))}
  </List> */}