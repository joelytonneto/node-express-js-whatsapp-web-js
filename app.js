require('dotenv').config();
const cors = require("cors");
const express = require('express');
const bodyParser = require("body-parser");
const routerWhatsAppWeb = require("./routes/api/whatsAppWeb/api");
const client = require('./utils/whatsApp/whatsappManager');

const app = express();

app.use(
    cors({
      origin: '*'
    })
);

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use("/whatsAppWeb", routerWhatsAppWeb);

app.listen(process.env.API_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.API_PORT}`);
});