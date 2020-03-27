import { saveReview } from '../actions/hotelDetailActions';
import axios from 'axios';
import { API_URL } from '../../constants';
import Logout from '../../commonFunctions/logout';

const saveReviewRating = (data, token) => {
  return dispatch => {
    dispatch(saveReview({ error: false, message: '' }));
    axios({
      method: 'POST',
      url: API_URL + '/add-rating',
      headers: {
        'Authorization': token
      },
      data: data,

    })
      .then(function (response) {
        dispatch(saveReview({ error: false, message: 'success' }));
      })
      .catch(function (error) {
        if (error.response.data.message === 'Please Login to Continue') {
          Logout();
        }
        dispatch(saveReview({ error: true, message: Object.values(error.response.data.error)[0][0] }));
      });
  }

}

export default saveReviewRating;