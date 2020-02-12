import { API_URL } from '../../constants/index';
import axios from 'axios';

const BookHotel = async (data, token) => {
    return await axios({
        method: 'POST',
        url: API_URL + '/book-room',
        headers:{
            'Accept-Language' : 'en',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: data
    })
    .then(function (response) {
        return response.data.data;
    })
    .catch(function (error) {
        return error.response.data;
    });
}

export default BookHotel;