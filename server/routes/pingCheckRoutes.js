const express = require('express');
const router = express.Router();
const pingCheckController = require('../controllers/pingCheckController');
const auth = require('../middleware/auth');

// restituisce tutti i PingCheck dell'utente corrente
router.get('/', auth, pingCheckController.getPingChecks);

// crea un nuovo PingCheck per l'utente corrente
router.post('/', auth, pingCheckController.createPingCheck);

router.put('/:id', auth, pingCheckController.updatePingCheck);
router.delete('/:id', auth, pingCheckController.deletePingCheck);

module.exports = router;
