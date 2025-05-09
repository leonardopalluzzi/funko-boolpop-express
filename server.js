const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const productRouter = require('./routers/productRouter');
const transactionRouter = require('./routers/transactionRouter');
const error_404 = require('./middlewares/NotFound');

//middleware per cors
app.use(cors(
    {
        origin: process.env.FRONT_URL
    }
));

app.use(express.json())

app.use(express.static('./public'))

// Endpoint
app.use('/api/v1/funkoboolpop', productRouter)
app.use('/api/v1/transactions', transactionRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

})

// Error Handler

app.use(error_404)