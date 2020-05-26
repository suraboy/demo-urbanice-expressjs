import express from 'express';
import SendMailController from "../../app/api/controllers/SendMailController";
import sendMailRequest from '../../app/request/sendMail';
import passportManager from '../../app/middleware/passport';

const router = express.Router();
//api Assignment 1 #send mail
router.route('/').post([passportManager.authenticate,sendMailRequest.sendMailRequest],SendMailController.sendGrid);

export default router;