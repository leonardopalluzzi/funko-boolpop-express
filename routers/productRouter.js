const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const error_404 = require('../middlewares/NotFound')

// Index

router.get('/', productController.index)

// Show

router.get('/:slug', error_404, productController.show)

// Store

router.post('/', productController.store)

// Update

router.put('/:slug', productController.update)

// Modify

router.patch('/:slug', productController.modify)

// Destroy

router.delete('/:slug', productController.destroy)


module.exports = router;