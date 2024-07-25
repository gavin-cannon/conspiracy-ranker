const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Conspiracy = require('../models/conspiracy');

router.get('/', async(req, res, next) => {
    try {
        const conspiracies = await Conspiracy.find();
        console.log(conspiracies);
        res.status(200).json(conspiracies);

    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
});

// POST a new conspiracy
router.post('/', async(req, res, next) => {
    const maxConspiracyId = sequenceGenerator.nextId('conspiracies');

    const conspiracy = new Conspiracy({
        id: maxConspiracyId,
        name: req.body.name,
        rating: req.body.rating,
        description: req.body.description,
        imageUrl: req.body.imageUrl,

    });

    try {
        const createdConspiracy = await conspiracy.save();
        res.status(201).json(
            createdConspiracy
        );
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});


// PUT update a conspiracy by ID
router.put('/:id', async(req, res, next) => {
    try {
        const conspiracy = await Conspiracy.findOne({ id: req.params.id });

        if (!conspiracy) {
            return res.status(404).json({
                message: 'Conspiracy not found',
                error: { conspiracy: 'Conspiracy not found' }
            });
        }

        conspiracy.name = req.body.name;
        conspiracy.description = req.body.description;
        conspiracy.rating = req.body.rating;
        conspiracy.imageUrl = req.body.imageUrl;

        const updatedConspiracy = await Conspiracy.updateOne({ id: req.params.id }, conspiracy);
        res.status(204).json({
            message: 'Conspiracy updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

// DELETE a conspiracy by ID
router.delete('/:id', async(req, res, next) => {
    try {
        const conspiracy = await Conspiracy.findOne({ id: req.params.id });

        if (!conspiracy) {
            return res.status(404).json({
                message: 'Conspiracy not found',
                error: { conspiracy: 'Conspiracy not found' }
            });
        }

        await Conspiracy.deleteOne({ id: req.params.id });
        res.status(204).json({
            message: 'Conspiracy deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});


module.exports = router;