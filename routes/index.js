const express = require('express');
const router = express.Router();

const contactController = require('../controllers/characters');
const kingdomController = require('../controllers/kingdom');
const validation = require('../middleware/validate');



// homefile


router.get('/characters', contactController.getAll);

router.get('/characters/:id', contactController.getSingle);

router.post('/characters', validation.saveCharacter, contactController.newPost);

router.put('/characters/:id', validation.saveCharacter, contactController.updatePost);

router.delete('/characters/:id', contactController.clearPost);


router.get('/kingdom', kingdomController.getAll);

router.get('/kingdom/:id', kingdomController.getSingle);

router.post('/kingdom', validation.saveKingdom, kingdomController.newPost);

router.put('/kingdom/:id', validation.saveKingdom, kingdomController.updatePost);

router.delete('/kingdom/:id', kingdomController.clearPost);


module.exports = router;