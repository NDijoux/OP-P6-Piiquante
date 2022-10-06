// All Const needed ----------------------------------
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


// Mongoose connection -------------------
mongoose.connect('mongodb+srv://NDIJOUX:uvYGdWfBB7Mb010y@cluster0.g8748wf.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// CORS Management -----------------------------------
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    next();
  });

// Express app creation ------
app.use(express.json());


// All ROUTES --------------------
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// Export ------------------------
module.exports = app;