import { Box } from "@mui/material";
import ProductSearchBar from "./ProductSearchBar";
import ProductGrid from "./ProductGrid";

const ProductSection = () => {
    return (
        <Box flex={1} p={2}>
            <ProductSearchBar />
            <ProductGrid />
        </Box>
    )
}

export default ProductSection