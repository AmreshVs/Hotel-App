import { loadPrices } from '../actions/hotelDetailActions';
import axios from 'axios';
import { API_URL } from '../../constants';

const LoadPrices = (data, token) => {
console.log(data)
    return dispatch => {
        dispatch(loadPrices({pricesLoading: true, data: {data: []}}));
        axios({
            method: 'POST',
            url: API_URL + '/choose-room',
            headers:{
                'Accept-Language' : 'en',
                'Content-Type' : 'application/json',
                'Authorization': token
            },
            data: data,
        })
        .then(function (response) {
            console.log(response.data);
            dispatch(loadPrices({pricesLoading: false, data: response.data}));
        })
        .catch(function (error) {
            dispatch(loadPrices({pricesLoading: false, data: {data: []}, error: error.response.data.message}));
        });
    }
}

export default LoadPrices;