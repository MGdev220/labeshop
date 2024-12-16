/* eslint-disable react/prop-types */
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const ListWithLoader = ({ items, isLoading, getAllProductsByCategory, message = "Aucun élément trouvé." }) => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      // minHeight="100vh"
      bgcolor="#f9f9f9"
      p={2}
    >
      {isLoading ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress size={60} thickness={4} color="primary" />
          <Typography variant="h6" color="textSecondary" mt={2}>
            Chargement en cours...
          </Typography>
        </Box>
      ) : items.length > 0 ? (
        <List sx={{ width: "100%", maxWidth: 500, /*bgcolor: "background.paper"*/ }} style={{ cursor: "pointer" }}>
          {items.map((category, index) => (
            <div key={index} onClick={() => { getAllProductsByCategory(category.id) }}>
              <ListItem button divider>
                <ListItemText primary={category.name} />
              </ListItem>
            </div>
          ))}
        </List>

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
    </Box>
  );
};

export default ListWithLoader;


{/* <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
{items.map((item, index) => (
  <ListItem key={index} divider>
    <ListItemText primary={item.name} secondary={item.description} />
  </ListItem>
))}
</List> */}