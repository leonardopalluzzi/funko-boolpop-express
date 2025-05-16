const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const productRouter = require('./routers/productRouter');
const transactionRouter = require('./routers/transactionRouter');
const recommendedRouter = require('./routers/recommendedRouter')
const chatRouter = require('./routers/chatRouter')


//middleware per cors
app.use(cors(
    // {
    //     origin: process.env.FRONT_URL,
    //     methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
    // }
));

app.use((req, res, next) => {
    if (req.originalUrl === '/api/v1/transactions/stripe') {
        next(); // salta express.json()
    } else {
        express.json()(req, res, next);
    }
});


// app.use(express.json())

app.use(express.static('./public'))

// Endpoint
app.use('/api/v1/funkoboolpop', productRouter)
app.use('/api/v1/transactions', transactionRouter)
app.use('/api/v1/recommended', recommendedRouter)
app.use('/api/v1/chatbot', chatRouter)




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

})
