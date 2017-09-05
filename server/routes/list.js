const lists =require('../controllers/list');
const router = require('koa-router')();

router.post('/addList/',lists.addList);
router.get('/delList/:list_id',lists.delList);
router.put('/editList/:list_id/:status',lists.editList);
router.get('/getLists/:id',lists.getLists);

module.exports = router;