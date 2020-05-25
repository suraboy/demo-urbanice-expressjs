import express from 'express';
import GroupController from "../../app/api/controllers/GroupController";
import groupRequest from '../../app/request/groups';
const router = express.Router();

//api Assignment 2
router.route('/').get([groupRequest.listRequest],GroupController.index);
router.route('/:id').get([groupRequest.showRequest],GroupController.find);
router.route('/').post([groupRequest.createRequest],GroupController.create);
router.route('/:id').put([groupRequest.updateRequest],GroupController.update);
router.route('/:id').delete([groupRequest.deleteRequest],GroupController.delete);

export default router;