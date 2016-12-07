// const mongoose = require('mongoose');
// const request = require('../../client/utils/request').default;
const axios = require('axios');

// event model
// const Event = mongoose.model('Event');

export default router => {

  // Get initial app data
  router.get('/events/search/', function(req, res, next) {
    axios.get('https://api.meetup.com/find/events', {
      params: {
        key: '4fb2575d64774911197925566e13f',
        lat: 40.677,
        lon: -73.982
      }
    })
    .then(responseIhope => res.json(responseIhope.data))
    .catch(errors => console.log(errors))
  });

  return router;
}
