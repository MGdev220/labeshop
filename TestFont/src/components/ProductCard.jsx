/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react"
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAlert } from 'react-alert'
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import { addToCart } from '../services/cart'
import { addOrder } from '../services/order'
import Alert from '../components/Alert';
import { useAuthStore } from '../store/useAuthStore'
import { decodeUserByToken } from '../utils/utils'

const ProductCard = ({ product }) => {

    const alert = useAlert()

    const navigate = useNavigate();

    const onAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const user = decodeUserByToken();
                const response = await addToCart(user.id, product.id)
                alert.success(response.message)
                console.log(response);
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    }


    const onOrder = async (product) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const user = decodeUserByToken();
                addSingleProductToOrder(user.id, product);
                navigate("/order");
                // const response = await addToCart(user.id, product.id)
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    }

    const addSingleProductToOrder = async (userId, product) => {
        // const userId = decodeUserByToken().id || null ;
        const response = await addOrder(userId, [{...product, CartProducts:{ quantity: 1 }}], product.price);
        alert.success(response.message)
        // Navigate("/order");
    };

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    Code: {product.code}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button startIcon={<ShoppingCartIcon />}
                    onClick={() => onAddToCart(product)} size="small" variant="contained" color="primary">
                    panier
                </Button>
                <Button startIcon={<PaymentIcon />}
                    onClick={() => onOrder(product)} size="small" variant="contained" color="secondary">
                    Commander
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
