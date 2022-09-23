/// All const required -----
const Sauce = require('../models/Sauce');

// Display ALL SAUCES -----
exports.allSauces = (req, res, next) => {
    Sauce.find()
        .then((aSauces) => {
            res.status(200).json(aSauces);
        })
        .catch((error) => res.status(400).json({error}));
};

// Display SELECTED SAUCE ----
exports.selectedSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sltdSauce) => res.status(200).json(sltdSauce))
        .catch((error) => res.status(400).json({error}));
};

// Create SAUCE ----
exports.createSauce = (req, res, next) => {
    //extraction of the sauce via parse
    const extractSauce = JSON.parse(req.body.sauce);
    //control of the match between user ID & token ID
    if (extractSauce.userId !== req.auth.userId) {
        return res.status(403).json('forbidden access denied');
    } else if (
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpg"
      ) {
        const sauceCreated = new Sauce({
            //destructuring ES6 : https://www.youtube.com/watch?v=NIq3qLaHCIs
            ...extractSauce,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
        });
        if (sauceCreated.heat < 0 || sauceCreated.heat > 10) {
            sauceCreated.heat = 0;
        }
        sauceCreated
        .save()
        .then(() => res.status(201).json({message: 'Sauce saved'}))
        .catch((error) => res.status(400).json({error}));
      } else {
        console.log('sauce creation failed');
      }
};

// Modify SAUCE ----

// Delete SAUCE ----

// Like SAUCE -----*/