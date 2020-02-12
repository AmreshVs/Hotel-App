import axios from 'axios';
import { API_URL } from '../../constants';

const LoadBookingsHistory = async (token) => {
    return await axios({
        method: 'GET',
        url: API_URL + '/get-booking-history',
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

export default LoadBookingsHistory;