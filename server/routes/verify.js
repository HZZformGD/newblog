const verify =require('../controllers/verify');
const router = require('koa-router')();

router.post('/verify',verify.verify);

module.exports = router;