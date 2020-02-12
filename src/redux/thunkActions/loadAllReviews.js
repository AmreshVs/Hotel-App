import axios from 'axios';
import { API_URL } from '../../constants';

const LoadAllReviews = async (id, token) => {
    return await axios({
        method: 'GET',
        url: API_URL + '/get-all-reviews?hotel_id='+id,
        headers:{
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

export default LoadAllReviews;