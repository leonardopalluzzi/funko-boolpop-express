const error_404 = (req, res, next) => {
    res.status(404).json({
        error: '404 Not Found',
        message: 'Product Not Found'
    })
}

module.exports = error_404