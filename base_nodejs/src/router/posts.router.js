const express = require('express');
const router = express.Router();

const controller = require('../controller/posts.controller');
router.get('/', controller.get);
router.get('/byId/:id', controller.getById);
router.get('/search', controller.getSearch);
router.post('/create', controller.create);
router.post('/update/:id', controller.update);

module.exports = router;
