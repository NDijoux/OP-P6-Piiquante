/// All const required -----
const Sauce = require('../models/Sauce');
// filesystem to modify files
const fs = require('fs');

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
    delete extractSauce._id;
    delete extractSauce.userId;
    /*const sauceBase ={
        likes: 0,
        dislikes: 0,
        liked: [],
        disliked: []
    }*/
   if (
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/png" ||
        req.file.mimetype === "image/jpg"
      ) {
        const sauceCreated = new Sauce({
            //destructuring ES6 : https://www.youtube.com/watch?v=NIq3qLaHCIs
            ...extractSauce,
            userId: req.auth.userId,
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
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({message : 'Access Denied'})
        } else {
            Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Sauce modified'}))
            .catch(error => res.status(400).json({ error }));
        }
    })
    .catch((error) => res.status(400).json({error}));
};

// Delete SAUCE ----
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce erased !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

// Like SAUCE -----
/*exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
}*/