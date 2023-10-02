require('dotenv').config();
const client = require('../utils/whatsApp/whatsappManager');
const { Location, List, Buttons, MessageMedia } = require('whatsapp-web.js');

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

    // Enviar mensagem comum personalisável
    client.sendMessage(numeroFormatado, mensagem)
        .then(response => {            
            res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Erro ao enviar mensagem.' });
        });

    //Envio de PDF
    const media = await MessageMedia.fromUrl('https://logos-cliente.s3.us-east-2.amazonaws.com/propostaSimulador.pdf');    
    client.sendMessage(numeroFormatado, media, { caption: 'PDF' })
        .then(response => {            
            res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Erro ao enviar mensagem.' });
        });
    
    // Envio de imagem 
    // const media = MessageMedia.fromFilePath(`assets/images/pin.png`);
    // client.sendMessage(numeroFormatado, media, { caption: 'Pinguim' })
    //     .then(response => {            
    //         res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    //     });

    // Envio de imagem Visualização Única
    // const media = MessageMedia.fromFilePath(`assets/images/pin.png`);
    // client.sendMessage(numeroFormatado, media, { isViewOnce: true })
    //     .then(response => {            
    //         res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    //     });

    // Envio de áudio normal apenas como arquivo
    // const media = MessageMedia.fromFilePath(`assets/sounds/alerta1.mp3`);
    // client.sendMessage(numeroFormatado, media)
    //     .then(response => {            
    //         res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    //     });

    // Envio de áudio como mensagem de Voz
    // const media = MessageMedia.fromFilePath(`assets/sounds/alerta1.mp3`);
    // client.sendMessage(numeroFormatado, media, { sendAudioAsVoice: true })
    //     .then(response => {            
    //         res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    //     });

    // Mandar Localização
    // client.sendMessage(numeroFormatado, new Location(-3.791789297734254, -38.47091540021312, 'AG Autos Service\nOficina mecânica'))
    //     .then(response => {            
    //         res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    //     });

    // Envio de Lista, Não é tão simples, precisa entrar em contato com WhatsApp Bussiness para aprovação
    // let sections = [{ title: 'sectionTitle', rows: [{ title: 'ListItem1', description: 'desc' }, { title: 'ListItem2' }] }];
    // let list = new List('List body', 'btnText', sections, 'Title', 'footer');
    // client.sendMessage(numeroFormatado, list)
    //     .then(response => {            
    //         res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: 'Erro ao enviar mensagem.'+ error });
    //     });
    
    // Envio de Botões, Não é tão simples, precisa entrar em contato com WhatsApp Bussiness para aprovação
    // client.sendMessage(numeroFormatado, new Buttons('Button body', [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }], 'title', 'footer'))
    //     .then(response => {            
    //         res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    //     })
    //     .catch(error => {
    //         res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    //     });    
};