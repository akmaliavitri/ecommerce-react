const router = require('express').Router()

const userRouter = require('./user.router')
const productRouter = require('./product.router')
const chartRouter = require('./chart.router')
const bannerRouter = require('./banner.router')

router.use('/banner', bannerRouter)
router.use('/chart', chartRouter)
router.use('/product', productRouter)
router.use('/', userRouter)

module.exports = router