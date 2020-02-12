import axios from 'axios';
import { API_URL } from '../../constants';

const LoadHomeData = async (token) => {
    return await axios({
        method: 'GET',
        url: API_URL + '/home',
        headers:{
            'Accept-Language' : 'en',
            'Authorization': token
        }
    })
    .then(function (response) {
        return response.data.data;
    })
    .catch(function (error) {
        return error.response.data;
    });
}

export default LoadHomeData;