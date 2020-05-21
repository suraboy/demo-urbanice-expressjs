require('dotenv').config();
import axios from 'axios'
import curlAxios from './../helpers/curlAxios';
import dotenv from "dotenv";
dotenv.config();

/*Setup default data*/
var endpoint = 'https://maps.googleapis.com/maps/api/directions/json?origin=SCG%20Bangsue,th&destination=CentralWorld,th&language=th&key=AIzaSyCnKI9QK7b04jAHeb-gR_6hulBzAfa_JgQ';

class googleApiService{
    async get() {
        return await axios.get(`${endpoint}`)
            .then(function (response) {
                let res = {
                    'status': response.status,
                    'response': response.data
                };
                return res;
            })
            .catch(function (error) {
                console.log(error);
                let res = {
                    // 'status': error.response.status,
                    'response': error.response
                };
                return res;
            });
    }
}

export default new googleApiService();
