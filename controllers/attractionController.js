const Attraction = require('../models/attractions')
const mongoose = require('mongoose')

//get all attractions
const getAttractions = async (req, res) => {

    const attractions = await Attraction.find({}).sort({createdAt: -1})

    res.status(200).json(attractions)
}

//get single worout
const getAttraction = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such attraction'})
    }

    const attraction = await Attraction.findById(id)

    if(!attraction) {
        return res.status(404).json({error: 'No such attraction'})
    }

    res.status(200).json(attraction)
}

//create new attraction 
const createAttraction = async (req, res) => {
    const {title, info, location, image} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!info) {
        emptyFields.push('info')
    }
    if(!location) {
        emptyFields.push('location')
    }
    if(!image) {
        emptyFields.push('image')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all the fields", emptyFields })
    }

    // add doc to db
    try {
        const attraction = await Attraction.create({title, info, location, image})
        res.status(200).json({attraction}) 
    }catch(error) {
        res.status(400).json({error: error.message})    
    }
}


//delete a attraction
// const deleteAttraction = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such attraction'})
//     }

//     const attraction = await Attraction.findOneAndDelete({_id: id})

//     if(!attraction) {
//         return res.status(404).json({error: 'No such attraction'})
//     }

//     res.status(200).json(attraction)
// }

//update a attraction
// const updateAttraction = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No such attraction'})
//     }

//     const attraction = await Attraction.findByIdAndUpdate({_id: id}, {
//         ...req.body
//     })

//     if(!attraction) {
//         return res.status(404).json({error: 'No such attraction'})
//     }

//     res.status(200).json(attraction)
// }


module.exports = {
    getAttractions,
    getAttraction,
    createAttraction
}