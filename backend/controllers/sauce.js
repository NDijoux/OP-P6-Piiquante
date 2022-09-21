/*// All const required -----
const Sauce = require('../models/Sauce');

// Display ALL SAUCES -----
exports.allSauces = (req, res, next) => {
    Sauce.find()
        .then((aSauces) => {
            res.status(200).json(aSauces);
        })
        .cath((error) => res.status(400).json({error}));
};

// Display SELECTED SAUCE ----
exports.selectedSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((sltdSauce) => res.status(200).json(sltdSauce))
        .cath((error) => res.status(400).json({error}));
};

// Create SAUCE ----

// Modify SAUCE ----

// Delete SAUCE ----

// Like SAUCE -----*/