import express from 'express';
import UrbaniceController from "../../app/api/controllers/UrbaniceController";
import scgRequest from '../../app/request/scg';

const router = express.Router();
router.route('/send-mail').post([scgRequest.sendMailRequest],UrbaniceController.sendMail);
router.route('/xyz').get([],UrbaniceController.findXYZ);
router.route('/abc').get([],UrbaniceController.findABC);
router.route('/map').get([],UrbaniceController.curlApiGoogleMap);

export default router;