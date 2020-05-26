import express from 'express';
import UrbaniceController from "../../app/api/controllers/UrbaniceController";
import sendMailRequest from '../../app/request/sendMail';
import passportManager from '../../app/middleware/passport';

const router = express.Router();
//api Assignment 1 #send mail
router.route('/').post([passportManager.authenticate,sendMailRequest.sendMailRequest],UrbaniceController.sendMail);

export default router;