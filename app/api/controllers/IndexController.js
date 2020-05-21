import User from '../../models/User';
import httpStatus from 'http-status';
import {validationResult} from 'express-validator/check';
import {messageValidate} from './../../helpers/wrapValidateMessage';

class IndexController {
    async index(req, res, next) {
        return res.status(200).send('hello');
    };
}

export default new IndexController();