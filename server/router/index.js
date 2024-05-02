const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const categoryController = require('../controllers/category-controller');
const newsController = require('../controllers/news-controller');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/createCategory', categoryController.createCategory);

router.post('/createNews', newsController.createNews);
router.post('/deleteNews', newsController.deleteNews);
router.post('/updateNews', newsController.updateNews);
router.get('/news', newsController.getAllNews);
router.post('/getOneNew', newsController.getNewsById);


module.exports = router
