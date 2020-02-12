import axios from 'axios';
import { API_URL } from '../../constants';

const LoadBookingsDetails = async (token, id) => {
    return await axios({
        method: 'GET',
        url: API_URL + '/get-booking-details?booking_id=' + id,
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

export default LoadBookingsDetails;