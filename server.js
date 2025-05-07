const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const productRouter = require('./routers/productRouter')
const connection = require('./db/db')

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use(express.static('/public'))

// app.use('/api/v1/funkboolpop', productRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

})