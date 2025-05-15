const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
const error_404 = require('../middlewares/NotFound')

// Index

router.get('/', chatController.index)

// Show

router.get('/:slug', error_404, chatController.show)

// Store

router.post('/', chatController.store)

// Update

router.put('/:slug', chatController.update)

// Modify

router.patch('/:slug', chatController.modify)

// Destroy

router.delete('/:slug', chatController.destroy)


module.exports = router;