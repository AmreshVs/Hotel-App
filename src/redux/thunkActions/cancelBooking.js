import axios from 'axios';

const CancelBooking = async (id, token) => {
    return await axios({
        method: 'POST',
        url: 'https://pandaapi.amreshrepos.ml/api/v1/cancel-booking',
        headers:{
            'Accept-Language' : 'en',
            'Authorization': token
        },
        data:{
            booking_id: id
        }
    })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error.response;
    });
}

export default CancelBooking;