const mongoose = require('mongoose');

const express = require('express');
const User = require('./models/User');

const app = express();
mongoose.connect('mongodb+srv://NDIJOUX:uvYGdWfBB7Mb010y@cluster0.puphsd4.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

// ajouter les methodes 
app.use((req, res, next) =>{
    console.log('Requête reçue !');
    next();
});

/*app.post('/register', (req, res, next) => {
    //Check if the email provided is not already registered
    // traitement à faire dans le controleur user + token + JWT
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            // Return a 400 error if the email adress already exists
            return res.status(400).json({ email: "Cette adresse mail est déjà utilisée"});
        } else {
            // Otherwise create a new user
            const newUser = new User ({
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save()
            return res.status(200).json({msg: newUser})
        }
    })
})*/


app.use((req, res) =>{
    console.log('Réponse envoyée avec succés');
});

module.exports = app;