import axios from 'axios';
import { ONE_SIGNAL_API_URL } from '../constants/index';
import GetOneSignalAdminId from './getOneSignalAdminId';

const SendNotification = async (heading, content, token, buttons = [], data = {}) => {

  const admin_id = await GetOneSignalAdminId(token);
  let message = { 
    app_id: "9cf8c27d-0a89-4e7d-bb2a-d24e8bfd03ab",
    headings: {"en": heading},
    contents: {"en": content},
    include_player_ids: [admin_id],
    buttons: buttons,
    data: data
  };

  axios({
    method: 'POST',
    url: ONE_SIGNAL_API_URL,
    headers:{
      "Content-Type": "application/json; charset=utf-8"
    },
    data: message,
  })
  .then(function (response) {
    // console.log(response.data);
  })
  .catch(function (error) {
    // console.log(error.response.data);
  });
}

export default SendNotification;