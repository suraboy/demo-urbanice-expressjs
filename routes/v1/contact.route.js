import express from 'express';
import ContactController from "../../app/api/controllers/ContactController";
import contactRequest from '../../app/request/contacts';
import passportManager from '../../app/middleware/passport';
const router = express.Router();

//api Assignment 2
router.route('/').get([passportManager.authenticate,contactRequest.listRequest],ContactController.index);
router.route('/:id').get([passportManager.authenticate,contactRequest.showRequest],ContactController.find);
router.route('/').post([passportManager.authenticate,contactRequest.createRequest],ContactController.create);
router.route('/:id').put([passportManager.authenticate,contactRequest.updateRequest],ContactController.update);
router.route('/:id').delete([passportManager.authenticate,contactRequest.deleteRequest],ContactController.delete);

export default router;