import { loadPrices, removeServices, serviceChecked } from '../actions/hotelDetailActions';
import axios from 'axios';

const LoadPrices = (data, token) => {
    return dispatch => {
        dispatch(loadPrices({pricesLoading: true, data: {data: []}}));
        axios({
            method: 'POST',
            url: 'https://pandaapi.amreshrepos.ml/api/v1/choose-room',
            headers:{
                'Accept-Language' : 'en',
                'Content-Type' : 'application/json',
                'Authorization': token
            },
            data: data,
        })
        .then(function (response) {
            dispatch(loadPrices({pricesLoading: false, data: response.data}));
        })
        .catch(function (error) {
            dispatch(loadPrices({pricesLoading: false, data: {data: []}, error: error.response.data.message}));
        });
    }
}

export default LoadPrices;