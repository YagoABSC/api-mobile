const express  = require('express');
const cors = require('cors');
require('dotenv').config()


const router = require('./src/routes/route');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Aplicação está viva na porta ${process.env.PORT}` )
});

app.get('/', (req, res) => {
    res.send('Hello, final de curso')
})