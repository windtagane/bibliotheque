const router = require("express").Router();

const livreController = require('../controllers/livreController');

router.get('/', livreController.list);
router.post('/ajout', livreController.save);

module.exports = router;