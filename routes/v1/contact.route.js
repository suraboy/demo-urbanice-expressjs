import express from 'express';
import ContactController from "../../app/api/controllers/ContactController";
import contactRequest from '../../app/request/contacts';
const router = express.Router();

//api Assignment 2
router.route('/').get([contactRequest.listRequest],ContactController.index);
router.route('/:id').get([contactRequest.showRequest],ContactController.find);
router.route('/').post([contactRequest.createRequest],ContactController.create);
router.route('/:id').put([contactRequest.updateRequest],ContactController.update);
router.route('/:id').delete([contactRequest.deleteRequest],ContactController.delete);

export default router;