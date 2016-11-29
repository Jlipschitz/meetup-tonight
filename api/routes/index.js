const mongoose = require('mongoose');
// const request = require('../../client/utils/request').default;
const axios = require('axios');

// event model
const Event = mongoose.model('Event');


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

  router.get('/events', function(req, res, next) {
    Event.find({}, null, {})
      .then(allEvents => res.json(allEvents))
      .catch(err => !console.log(err) && next(err)); // pass DB errors to Express error handler
  });

  router.post('/events', function(req, res, next) {
    const newEvent = new Event(req.body);
    newEvent.save()
      .then(savedEvent => res.json(savedEvent[0] || savedEvent)) // sometimes returns array of [savedEvent, 1], not sure if this a MongoDB or Mongoose version thing
      .catch(err => !console.log(err) && next(err)); // pass DB errors to Express error handler
  });

  router.put('/events/:id', function(req, res, next) {
    Event.findByIdAndUpdate(req.params.id, req.body, { new:true }) // new option here says return the updated object to the following promise, vs. object prior to update
      .then(updatedEvent => res.status(200).json(updatedEvent))
      .catch(err => !console.log(err) && next(err)); // pass DB errors to Express error handler
  });

  router.delete('/events/:id', function(req, res, next) {
    Event.findByIdAndRemove(req.params.id)
      .then(deletedEvent => res.status(200).json(deletedEvent))
      .catch(err => !console.log(err) && next(err)); // pass DB errors to Express error handler
  });

  return router;
}
