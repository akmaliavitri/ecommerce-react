const router = require('express').Router()

const bannerController = require('../controllers/banner.controller')

router.post('/add', bannerController.addBanner)
router.get('/', bannerController.findBanner)
router.delete('/delete/:id', bannerController.deleteBanner)

module.exports = router