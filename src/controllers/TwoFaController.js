//
const speakeasy = require('speakeasy'); 

//
const qrcode = require('qrcode');

class TwoFaController{

    gerarToken(req, res){
        const secret = speakeasy.generateSecret();
        qrcode.toDataURL(secret.otpauth_url, (err, data_url) =>{
            res.status(200).json({token: secret.base32, qrcode: data_url})
        })

    }

    validarToken(req, res){
        const { token, secret } = req.body

        const verified = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token,
            window: 2 //Aceita tokens do periodo anterior e do próximo também
        });

        res.status(200).json({ verified })
    }

}

module.exports = new TwoFaController();