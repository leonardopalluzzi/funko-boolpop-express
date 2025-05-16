const express = require('express')
const router = express.Router()
const recommendedController = require('../controllers/recommendedController')
const error_404 = require('../middlewares/NotFound')

// Index

router.get('/', recommendedController.index)

// Show

router.get('/:slug', error_404, recommendedController.show)

// Store

router.post('/', recommendedController.store)

// Update

router.put('/:slug', recommendedController.update)

// Modify

router.patch('/:slug', recommendedController.modify)

// Destroy

router.delete('/:slug', recommendedController.destroy)


module.exports = router;