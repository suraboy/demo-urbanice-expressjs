require('dotenv').config();
import {validationResult} from 'express-validator/check';
import {messageValidate} from './../../helpers/wrapValidateMessage';
import {taxConfig} from '../../../config/tax.js'
import dotenv from "dotenv";

dotenv.config();

class CalCulateController {
    //calculate income tax
    async incomeTax(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let messageError = await messageValidate(errors.array());
            let response = getMessageError(messageError);
            return res.status(422).json(response);
        }

        let incomeTax = await calculateTax(req.query.net_income);

        let response = {
            'data': {
                'net_income': parseFloat(req.query.net_income),
                'income_tax': incomeTax
            }
        };

        return res.status(200).send(response);
    };
}

const calculateTax = async (netIncome) => {
    let incomeTax = 0;
    var search = parseInt(netIncome);
    const config = taxConfig['tax_rate'];
    let array = config;
    //loop check income tax
    for (let i = 0; i < array.length; i++) {
        let net_val = parseInt(array[i]['net_val']);
        if (net_val >= search) {
            incomeTax = ((search - parseInt(array[i]['net_val'])) * parseFloat(array[i]['tax'])) + parseInt(array[i]['diff_val']);
            return incomeTax;
            break;
        }
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

export default new CalCulateController();
