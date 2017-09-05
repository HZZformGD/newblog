const auth =require('../controllers/auth');
const router = require('koa-router')();


router.post('/log',auth.log);
router.post('/signup',auth.signup);

module.exports = router;