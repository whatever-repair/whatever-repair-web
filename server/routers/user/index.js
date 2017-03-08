const router = require('express').Router();
import controller from './controller';

router.post('/signup', controller.register);
router.post('/login', controller.login);

module.exports = router;
