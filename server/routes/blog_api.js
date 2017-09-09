const userInfo =require('../controllers/userInfo');
const articles =require('../controllers/articles');
const auth = require('../controllers/auth')
const nav = require('../controllers/nav')
const router = require('koa-router')();
const social = require('../controllers/social');
const song = require('../controllers/song');
const comments = require('../controllers/comments');

router.get('/getUserInfo/', userInfo.getUserInfo)
router.post('/editUserInfo', userInfo.editUserInfo)
router.get('/getArticles/:limit/:skip', articles.getArticles)
router.get('/getArticleDetails/:id', articles.getArticlesById)
router.get('/getArticles/search/:key/:limit/:skip', articles.searchByKey)
router.get('/getArchive/', articles.getArchive)
router.get('/nav/get', nav.getNav)
router.post('/nav/add', nav.addNav)
router.get('/nav/remove/:id', nav.removeNav)
router.get('/removeArticle/:id', articles.delArticlesById)
router.post('/addArticle', articles.addArticles)
router.post('/updateArticle', articles.editArticlesById)
router.post('/changePSW', auth.changePSW)
router.get('/social/get', social.getSocial)
router.get('/social/remove/:id', social.removeSocial)
router.post('/social/add', social.addSocial)
router.get('/song/search/:key', song.getSong)
router.post('/comments', comments.insert)
router.post('/getcommentsList',comments.getcommentsList)
router.post('/changeShow', comments.changeShow)
router.get('/getUnViewComments', comments.getUnViewComments)
router.get('/ViewedComments', comments.ViewedComments)
router.get('/oAuthList', auth.oAuthList)
module.exports = router