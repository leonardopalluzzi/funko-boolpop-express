const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const productRouter = require('./routers/productRouter');

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())

app.use(express.static('/public'))

app.use('/api/v1/funkoboolpop', productRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

})