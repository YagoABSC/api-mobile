const express  = require('express');
const cors = require('cors');


const router = require('./src/routes/route');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(4000, () => {
    console.log("Aplicação está viva na porta 4000")
});

app.get('/', (req, res) => {
    res.send('Hello, final de curso')
})