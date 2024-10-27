const express = require('express');
const router = express.Router();

const contactController = require('../controllers/characters');
const validation = require('../middleware/validate');



// homefile


router.get('/characters', contactController.getAll);

router.get('/characters/:id', contactController.getSingle);

router.post('/characters', validation.saveCharacter, contactController.newPost);

router.put('/characters/:id', validation.saveCharacter, contactController.updatePost);

router.delete('/characters/:id', contactController.clearPost);



module.exports = router;