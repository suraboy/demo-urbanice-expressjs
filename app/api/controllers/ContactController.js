require('dotenv').config();
import {validationResult} from 'express-validator/check';
import {getFullUrl, getOptions, paginate} from "../../helpers/pagination";
import {messageValidate} from './../../helpers/wrapValidateMessage';
import dotenv from "dotenv";
import models from "../../models/mysql";
import moment from "moment/moment";
dotenv.config();

class ContactController{

    async index(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }
            const options = getOptions(req)

            const {docs, pages, total} = await models.Contacts.paginate(options);
            // const docs = await models.Contacts.findAll({include: ["groups"]});

            const count = Object.keys(docs).length;
            //
            let pagination = paginate(getFullUrl(req), count, pages, total, options.paginate, options.page)

            let response = {
                data: docs,
                meta: pagination
            }
            return res.status(200).send(response);

        } catch (err) {
            return next(err);
        }
    };

    async find(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }
            const docs = await models.Contacts.findByPk(req.params.id,{ include: ["groups"] }).then(
                data => {
                    if (data === null) {
                        return res.status(404).json({
                            "errors": {
                                "status_code": 404,
                                "message": "Not found."
                            }
                        });
                    }
                    return data;
                }
            );

            let response = {
                data: docs
            }

            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    }

    async create(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            const docs = await models.Contacts.create(req.body);
            let response = {
                data: docs
            }
            return res.status(201).send(response);
        } catch (err) {
            return next(err);
        }
    }

    async update(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            delete req.body.id;

            req.body.updated_at = moment();

            const docs = await models.Contacts.findByPk(req.params.id).then(
                data => {
                    if (data === null) {
                        return res.status(404).json({
                            "errors": {
                                "status_code": 404,
                                "message": "Not found."
                            }
                        });
                    }
                    return models.Contacts.update(req.body, {where: {id: req.params.id}}).then(
                        _data => {
                            if (_data) {
                                return models.Contacts.findByPk(req.params.id);
                            }
                            return res.status(417).json({
                                "errors": {
                                    "status_code": 417,
                                    "message": "Update fail."
                                }
                            });
                        }
                    )
                }
            );

            let response = {
                data: docs
            }
            return res.status(200).send(response);
        } catch (err) {
            return next(err);
        }
    };

    async delete(req, res, next) {
        try {
            /*Error Varidate 422*/
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                let messageError = await messageValidate(errors.array());
                let response = getMessageError(messageError);
                return res.status(422).json(response);
            }

            const docs = await models.Contacts.findByPk(req.params.id).then(
                data => {
                    if (data === null) {
                        return res.status(404).json({
                            "errors": {
                                "status_code": 404,
                                "message": "Not found."
                            }
                        });
                    }
                    return models.Contacts.destroy({where: {id: req.params.id}}).then(
                        _data => {
                            if (_data) {
                                return res.status(204).send();
                            }

                            return res.status(417).json({
                                "errors": {
                                    "status_code": 417,
                                    "message": "Delete fail."
                                }
                            });
                        }
                    );
                }
            );

        } catch (err) {
            return next(err);
        }
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

export default new ContactController();
