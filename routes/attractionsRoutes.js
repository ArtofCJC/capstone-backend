const router = require('express').Router()

const Attraction = require('../models/attractions')


router.route('/').get((req, res) => {
    Attraction.find()
    .then(attractions => res.json(attractions))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/').post((req, res) => {
    const title = req.body.title;
    const info = req.body.info;
    const location = req.body.location;
    const image = req.body.image;
    const newAttraction = new Attraction({title, info, location, image});
    newAttraction.save()
    .then(() => res.json('Attraction added!'))
    .catch(err => res.status(400).json('Error: '+ err));
})

module.exports = router