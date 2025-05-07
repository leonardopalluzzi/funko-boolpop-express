const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')

app.use(express.json())

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);

})