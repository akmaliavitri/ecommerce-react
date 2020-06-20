const router = require('express').Router()

const productController = require('../controllers/product.controller')
const { authentication } = require('../middlewares/authentication')

router.use(authentication)
router.post('/add', productController.addProduct)
router.get('/', productController.findProduct)
router.delete('/delete/:id', productController.deleteProduct)
router.put('/update/:id', productController.updateProduct)
router.get('/:id', productController.getById)
module.exports = router