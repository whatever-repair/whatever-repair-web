const router = require('express').Router();
import controller from './login';

// router.post('/signup', controller.register);
router.post('/login', controller);

module.exports = router;
