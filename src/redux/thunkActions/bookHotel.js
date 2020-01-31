import axios from 'axios';

const BookHotel = async (data, token) => {
    return await axios({
        method: 'POST',
        url: 'https://pandaapi.amreshrepos.ml/api/v1/book-room',
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