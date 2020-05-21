import sendMailRequest from './sendMail';
import formRequest from '../../helpers/customValidate';

const request = {
    sendMailRequest: formRequest(sendMailRequest)
}

export default request