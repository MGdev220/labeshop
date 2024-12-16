import { Box, TextField } from "@mui/material";
import { useProductsStore } from "../store/useProductsStore"

function ProductSearchBar() {
    const { products, setFilteredProduct } = useProductsStore();

    const setProductFilter = (value) => {
        setFilteredProduct(products.filter((category) =>
            category.name.toLowerCase().includes(value.toLowerCase()))
        );
    }

    return (
        <Box mb={2}>
            <TextField
                fullWidth
                label="Rechercher un produit"
                variant="outlined"
                onChange={(e) => setProductFilter(e.target.value)}
            />
        </Box>
    )
}

export default ProductSearchBar