require('dotenv').config();
const client = require('../utils/whatsApp/whatsappManager');

exports.enviarMensagemWhatsAppWeb = async (req, res, next) => {
    const { numero, mensagem, token } = req.body;

    if (!numero || !mensagem || !token) {
        return res.status(400).json({ error: 'Número e mensagem e token são obrigatórios.' });
    }

    if (token != process.env.TOKEN_API_WHATSAPP) {
        return res.status(400).json({ error: 'Token está inválido' });
    }

    let numeroFormatado = '';
    if (numero.length == 13) {
        numeroFormatado = numero.slice(0, 4) + numero.slice(5) + '@c.us';
    } else {
        numeroFormatado = numero + '@c.us';
    }    
    
    client.sendMessage(numeroFormatado, mensagem)
        .then(response => {            
            res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Erro ao enviar mensagem.' });
        });
};