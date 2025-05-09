const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transcationController')

// Index

router.get('/', transactionController.index)

// Show

router.get('/:id', transactionController.show)

// Store

router.post('/', transactionController.store)

//stripe
router.post('/stripe', transactionController.payment)

// Update

router.put('/:id', transactionController.update)

// Modify

router.patch('/:id', transactionController.modify)

// Destroy

router.delete('/:id', transactionController.destroy)


module.exports = router;