import express from 'express';
import sendMailRouter from './sendMail.route';
import groupApiRouter from './group.route';
import contactApiRouter from './contact.route';

const router = express.Router();

/**
 * config version api
 */
router.use('/v1', sendMailRouter);
router.use('/v1/groups', groupApiRouter);
router.use('/v1/contacts', contactApiRouter);

export default router;