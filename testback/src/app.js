const express = require('express');
const sequelize = require('../config/database');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const { authenticate } = require('../src/middlewares/authMiddleware')
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"], // Liste des origines autorisées
    methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes HTTP autorisées
    credentials: true, // Autorise les cookies et les en-têtes d'autorisation
    allowedHeaders: ["Content-Type", "Authorization"], // En-têtes acceptés
  })
);

// Utiliser les routes Auth
app.use('/api/auth', authRoutes);

// Utiliser les routes Product
app.use('/api/products', productRoutes);

// Utiliser les routes Cart
// authenticate protege toutes les routes de cart
app.use('/api/cart', authenticate, cartRoutes);

// Utiliser les routes Order
app.use('/api/orders' , orderRoutes);

app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));
});
