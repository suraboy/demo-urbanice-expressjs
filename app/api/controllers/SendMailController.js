require('dotenv').config();
import {validationResult} from 'express-validator/check';
import {messageValidate} from './../../helpers/wrapValidateMessage';
import dotenv from "dotenv";
dotenv.config();
//req sendmail
const sgMail = require('@sendgrid/mail');

class SendMailController {
    //send mail by params
    async sendGrid(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messageError = await messageValidate(errors.array());
            let response = getMessageError(messageError);
            return res.status(422).json(response);
        }

        sgMail.setApiKey('{{API-KEY}}');

        let params = req.body;

        const msg = {
            to: params.to,
            from: params.from,
            subject: 'Send Mail with SendGrid By DevBoy',
            text: params.message,
            html: '<strong>' + params.message + '</strong>',
        };

        if(params.template_id){
            msg.template_id =  params.template_id;
            msg.dynamic_template_data = {
                subject: 'Send Mail with SendGrid By DevBoy',
                textInfo: params.message,
            };
        }

        sgMail.send(msg).then(m => {
            return res.status(200).send({
                'message': 'sent mail successfully'
            });
        })
            .catch(error => {
                //return error
                return res.status(400).send({
                    'message': error.toString()
                });
            });
    };
}

const getMessageError = (messageError) => {

    return {
        "errors": {
            "status_code": 422,
            "message": "The gives data was invalid.",
            "errors": messageError
        }
    };
}

export default new SendMailController();
