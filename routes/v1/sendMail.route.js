import express from 'express';
import UrbaniceController from "../../app/api/controllers/UrbaniceController";
import sendMailRequest from '../../app/request/sendMail';

const router = express.Router();
//api Assignment 1 #send mail
router.route('/send-mail').post([sendMailRequest.sendMailRequest],UrbaniceController.sendMail);

export default router;