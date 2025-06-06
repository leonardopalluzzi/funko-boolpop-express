const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')

// Index

router.get('/', transactionController.index)

// Show

router.get('/:id', transactionController.show)

// Store

router.post('/', transactionController.store)

//stripe
router.post('/stripe', express.raw({ type: 'application/json' }), transactionController.payment)

// Update

router.put('/:id', transactionController.update)

// Modify

router.patch('/:id', transactionController.modify)

// Destroy

router.delete('/:id', transactionController.destroy)


module.exports = router;