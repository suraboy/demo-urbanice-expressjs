import incomeTaxRequest from './incomeTax';
import formRequest from '../../helpers/customValidate';

const request = {
    incomeTaxRequest: formRequest(incomeTaxRequest)
}

export default request