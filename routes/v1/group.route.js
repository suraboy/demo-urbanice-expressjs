import express from 'express';
import GroupController from "../../app/api/controllers/GroupController";
import groupRequest from '../../app/request/groups';
import passportManager from '../../app/middleware/passport';
const router = express.Router();

//api Assignment 2
router.route('/').get([passportManager.authenticate,groupRequest.listRequest],GroupController.index);
router.route('/:id').get([passportManager.authenticate,groupRequest.showRequest],GroupController.find);
router.route('/').post([passportManager.authenticate,groupRequest.createRequest],GroupController.create);
router.route('/:id').put([passportManager.authenticate,groupRequest.updateRequest],GroupController.update);
router.route('/:id').delete([passportManager.authenticate,groupRequest.deleteRequest],GroupController.delete);

export default router;