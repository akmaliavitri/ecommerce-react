const router = require("express").Router();
const chartController = require("../controllers/chart.controller.");
const { authentication } = require("../middlewares/authentication");

router.use(authentication)
router.post('/add/:id', chartController.addToChart)
// router.post('/checkout/:id', chartController.checkout)
router.delete('/checkout/:id', chartController.checkout)
router.get('/', chartController.getChart)
router.delete('/delete/:id', chartController.deleteItem)
router.put("/increament/:id/update/:product", chartController.updateQuantityIn);
router.put("/decrement/:id/update/:product", chartController.updateQuantityDec);
router.put("/:id/update/:product", chartController.updateQuantity);
router.get('/:id', chartController.getChartItem)

module.exports = router;
