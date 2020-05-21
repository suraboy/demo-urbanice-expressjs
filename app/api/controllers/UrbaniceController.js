require('dotenv').config();
import {validationResult} from 'express-validator/check';
import {messageValidate} from './../../helpers/wrapValidateMessage';
import dotenv from "dotenv";
dotenv.config();
//req sendmail
const sgMail = require('@sendgrid/mail');

class UrbaniceController {
    //send mail by params
    async sendMail(req, res, next) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messageError = await messageValidate(errors.array());
            let response = getMessageError(messageError);
            return res.status(422).json(response);
        }

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    //X, Y, 5, 9, 15, 23, Z  - Please create a new function for finding X, Y, Z value
    async findXYZ(req, res, next) {
        //function y+2 , 5 + 4 , 8 + 6 , 15 + 8 , 23 + 10
        let question = "X, Y , 5, 9, 15, 23, Z";
        // plus : สำหรับ value เพิ่มขึ้น
        let z = await checkValue(23, (23 - 15), 'plus');
        // minus : สำหรับ value ลดลง
        let y = await checkValue(5, (9 - 5), 'minus');
        let x = await checkValue(y, (5 - y), 'minus');

        let response = {
            'x': x,
            'y': y,
            'z': z
        };

        let data = {
            'question': question,
            'response': response
        }
        return res.status(200).send(data);
    };

    //A = 21, A + B = 23, A + C = -21
    async findABC(req, res, next) {
        const a = 21;
        const b = 23 - a;
        const c = -21 - a;
        let response = {
            "question": "A = 21, A + B = 23, A + C = -21",
            "response": {
                "A": a,
                "B": b,
                "C": c
            }
        }
        return res.status(200).send(response);
    }
    ;

//Please use “Google API” for finding the best way to go to Central World from SCG Bangsue
    async curlApiGoogleMap(req, res, next) {
        try {
            const response = await googleApiService.get();

            return res.status(response.status).send(response);

        } catch (err) {
            return next(err);
        }
    }
}

const checkValue = async (i, j, action) => {
    if (action === 'plus') {
        return i + (j + 2);
    } else {
        return i - (j - 2);
    }
};

const getMessageError = (messageError) => {

    return {
        "errors": {
            "status_code": 422,
            "message": "The gives data was invalid.",
            "errors": messageError
        }
    };
}

export default new UrbaniceController();
