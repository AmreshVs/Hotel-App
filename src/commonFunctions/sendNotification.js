import axios from 'axios';

const SendNotification = (heading, content) => {
  var message = { 
    app_id: "9cf8c27d-0a89-4e7d-bb2a-d24e8bfd03ab",
    headings: {"en": heading},
    subtitle: {"en": "Chech to approve or cancel!"},
    contents: {"en": content},
    include_player_ids: ["6f838caa-2b24-4124-94d1-cf1809ae1b66"],
    buttons: [{"id": "like-button", "text": "Like", "icon": "http://i.imgur.com/N8SN8ZS.png", "url": "https://yoursite.com"}, {"id": "read-more-button", "text": "Read more", "icon": "http://i.imgur.com/MIxJp1L.png", "url": "https://yoursite.com"}],
    // big_picture: "http://i.imgur.com/N8SN8ZS.png",
  };

  axios({
    method: 'POST',
    url: 'https://onesignal.com/api/v1/notifications',
    headers:{
      "Content-Type": "application/json; charset=utf-8"
    },
    data: message,
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}

export default SendNotification;