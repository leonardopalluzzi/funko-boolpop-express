const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

// Index

router.get('/', productController.index)

// Show

router.get('/:slug', productController.show)

// Store

router.post('/', productController.store)

// Update

router.put('/:slug', productController.update)

// Modify

router.patch('/:slug', productController.modify)

// Destroy

router.delete('/:slug', productController.destroy)


module.exports = router;