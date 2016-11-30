var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    createdDate: {
        type: Date,
        default: new Date()
    },
    meetup: {
      _id: String,
      photo: String,
      link: String,
      lat: String,
      lon: String,
      city: String,
      country: String,
      state: String
    }
});

// set user schema on mongoose
mongoose.model('User', UserSchema);
