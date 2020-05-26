import express from 'express';
import CalCulateController from "../../app/api/controllers/CalCulateController";
import calculateRequest from '../../app/request/calculate';
import passportManager from '../../app/middleware/passport';

const router = express.Router();
//api Assignment 3 #calculate income tax
router.route('/tax').get([passportManager.authenticate,calculateRequest.incomeTaxRequest],CalCulateController.incomeTax);

export default router;