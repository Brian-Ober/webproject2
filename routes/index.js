const express = require('express');
const router = express.Router();

const contactController = require('../controllers/characters');



// homefile


router.get('/characters', contactController.getAll);

router.get('/characters/:id', contactController.getSingle);

router.post('/characters', contactController.newPost);

router.put('/characters/:id', contactController.updatePost);

router.delete('/characters/:id', contactController.clearPost);



module.exports = router;