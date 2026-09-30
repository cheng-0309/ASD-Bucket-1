const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const cache = require('../middleware/cache');

router.use(cache);

router.get('/',    ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/',   ctrl.create);
router.put('/:id',   ctrl.update);
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
