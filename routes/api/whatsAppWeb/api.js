const express = require('express');
const routerWhatsAppWeb = express();

const whatsAppWebController = require('../../../controller/whatsAppWebController');

routerWhatsAppWeb.post('/enviar-mensagem', whatsAppWebController.enviarMensagemWhatsAppWeb);
routerWhatsAppWeb.post('/enviar-pdf', whatsAppWebController.enviarPDFWhatsAppWeb);

module.exports = routerWhatsAppWeb;