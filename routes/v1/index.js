import express from 'express';
import sendMailRouter from './sendMail.route';
import groupApiRouter from './group.route';
import contactApiRouter from './contact.route';
import calculateApiRouter from './calculate.route';
const router = express.Router();

/**
 * config version api
 */
router.use('/v1/send-mail', sendMailRouter);
router.use('/v1/groups', groupApiRouter);
router.use('/v1/contacts', contactApiRouter);
router.use('/v1/calculate', calculateApiRouter);

export default router;