const mongoose = require('mongoose');

const GroupImageSchema = new mongoose.Schema({
  _id: { type: String },
  imageUrl: { type: String, default: null },
});

mongoose.model('GroupImage', GroupImageSchema);
