const express = require('express')

const musiquesControllers = require('../controllers/musiques-controllers')

const router = express.Router();

router.get('/', musiquesControllers.getMusiques );

router.get('/:musiqueId', musiquesControllers.getMusiqueById );

router.post('/', musiquesControllers.createMusique)

module.exports = router;