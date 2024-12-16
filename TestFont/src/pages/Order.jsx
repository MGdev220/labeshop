/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { decodeUserByToken } from '../utils/utils';
import { getUserOrders, updateOrderStatus, deleteOrder } from '../services/order'
import { useAuthStore } from '../store/useAuthStore'
import { useOrdersStore } from '../store/useOrderStore'
import { useNavigate } from "react-router-dom";
import DownloadReceiptButton from '../components/DownloadReceiptButton';
import { isConnectUser, initProductImages } from "../utils/utils";
import { useAlert } from 'react-alert'
import { Button, Typography, Box, Grid, Paper, Chip } from '@mui/material';
import { FaCreditCard, FaTrashAlt, FaDownload, FaCheck, FaClock, FaShoppingCart } from 'react-icons/fa';

// Données fictives
const user = decodeUserByToken();
// const orders = [
//   // {
//   //   id: "ORD001",
//   //   date: "2024-12-01",
//   //   deliveryDate: "2024-12-08",
//   //   deliveryAddress: "123 Rue des Fleurs, Paris, France",
//   //   carrier: "UPS",
//   //   status: "En attente",
//   //   total: 100,
//   //   products: [
//   //     { id: "P001", name: "T-shirt", price: 20, quantity: 2, image: "https://via.placeholder.com/50" },
//   //     { id: "P002", name: "Jeans", price: 60, quantity: 1, image: "https://via.placeholder.com/50" },
//   //   ],
//   // },
//   // {
//   //   id: "ORD002",
//   //   date: "2024-11-25",
//   //   deliveryDate: "2024-11-30",
//   //   deliveryAddress: "123 Rue des Fleurs, Paris, France",
//   //   carrier: "DHL",
//   //   status: "Livré",
//   //   total: 150,
//   //   products: [
//   //     { id: "P003", name: "Sneakers", price: 80, quantity: 1, image: "https://via.placeholder.com/50" },
//   //     { id: "P004", name: "Casquette", price: 25, quantity: 2, image: "https://via.placeholder.com/50" },
//   //   ],
//   // },
// ];

const Order = () => {

  const [ordersList, setOrdersList] = useState([])
  const alert = useAlert();
  const Navigate = useNavigate()

  // const { setOrdersList, ordersList } = useOrdersStore();

  useEffect(() => {
    if (!isConnectUser()) {
      Navigate("/login")
    } else {
      getAllUserOrders();
    }
  }, [])

  const getAllUserOrders = async () => {
    try {
      const response = await getUserOrders(user.id);
      const dd = response.map(e => {
        e.products = initProductImages(e.products)
        return e
      })
      setOrdersList(dd);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handlePayment = async (orderId) => {
    const status = 'validé'
    try {
      const response = await updateOrderStatus(orderId, status);
      getAllUserOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await deleteOrder(orderId, status);
      console.log(response);
      getAllUserOrders();
      alert.success(response.message)
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadReceipt = (orderId) => {
    alert(`Reçu pour la commande ${orderId} téléchargé`);
  };

  if (isConnectUser()) {
    return (
      <Box sx={{ padding: 3, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}>
          {/* Icône devant le titre */}
          <FaShoppingCart size={40} style={{ marginRight: '10px', color: '#2D3E50' }} />
          <Typography variant="h4" align="center" sx={{ color: '#2D3E50' }}>Mes Commandes</Typography>
        </Box>

        {/* Informations utilisateur */}
        <Paper sx={{ padding: 3, marginBottom: 4, backgroundColor: '#FFFFFF', boxShadow: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Informations utilisateur</Typography>
          <Typography><strong>Nom :</strong> {user.name}</Typography>
          <Typography><strong>Email :</strong> {user.email}</Typography>
          <Typography><strong>Adresse :</strong> {user.address}</Typography>
          <Typography><strong>Téléphone :</strong> {user.phone}</Typography>
        </Paper>

        {/* Liste des commandes */}
        <Grid container spacing={4}>
          {ordersList.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Paper sx={{ padding: 3, backgroundColor: '#FFFFFF', boxShadow: 2, marginBottom: 2 }}>
                <Grid container spacing={3} sx={{ marginBottom: 2 }}>
                  {/* Informations sur la commande */}
                  <Grid item xs={6}>
                    <Typography variant="h6">Commande n° {order.orderNumber}</Typography>
                    <Typography variant="body2"><strong>Date :</strong> {order.date}</Typography>
                    <Typography variant="body2"><strong>Date de livraison :</strong> {order.deliveryDate}</Typography>
                    <Typography variant="body2"><strong>Adresse de livraison :</strong> {order.deliveryAddress}</Typography>
                    <Typography variant="body2"><strong>Transporteur :</strong> {order.carrier}</Typography>
                  </Grid>

                  {/* Statut de la commande */}
                  <Grid item xs={6} sx={{ textAlign: 'right' }}>
                    <Chip
                      label={order.status}
                      color={order.status === 'en attente' ? 'warning' : 'success'}
                      icon={order.status === 'en attente' ? <FaClock /> : <FaCheck />}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Grid>
                </Grid>

                {/* Liste des produits */}
                {order.products.map((product) => (
                  <Grid container spacing={2} key={product.id} alignItems="center" sx={{ marginBottom: 1 }}>
                    <Grid item xs={2}>
                      <img src={product.image} alt={product.name} width={50} height={50} />
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body2"><strong>{product.name}</strong></Typography>
                      <Typography variant="body2">Prix : {product.price}€</Typography>
                      <Typography variant="body2">Quantité : {product.quantity}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{product.price * product.quantity}€</Typography>
                    </Grid>
                  </Grid>
                ))}

                {/* Total de la commande */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <Typography variant="h6"><strong>Total :</strong> {order.total}€</Typography>
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                  {order.status === 'en attente' && (
                    <Button variant="contained" color="primary" startIcon={<FaCreditCard />} onClick={() => handlePayment(order.orderId)}>
                      Effectuer le paiement
                    </Button>
                  )}
                  {order.status === 'en attente' && <Button variant="outlined" color="error" startIcon={<FaTrashAlt />} onClick={() => handleCancel(order.orderId)} sx={{ marginLeft: 2 }}>
                    Annuler la commande
                  </Button>}
                  {/* <Button variant="text" color="secondary" startIcon={<FaDownload />} onClick={() => handleDownloadReceipt(order)} sx={{ marginLeft: 2 }}>
                  Télécharger le reçu
                </Button> */}
                  <DownloadReceiptButton order={order} user={user} />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else {
    Navigate("/login")
  }

};

export default Order;
