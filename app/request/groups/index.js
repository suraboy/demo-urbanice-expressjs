import listRequest from './list';
import showRequest from './show';
import createRequest from './create';
import updateRequest from './update';
import deleteRequest from './delete';
import formRequest from '../../helpers/customValidate';

const request = {
    listRequest: formRequest(listRequest),
    showRequest: formRequest(showRequest),
    createRequest: formRequest(createRequest),
    updateRequest: formRequest(updateRequest),
    deleteRequest: formRequest(deleteRequest),
}

export default request