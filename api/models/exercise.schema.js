const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  userId: { required: true, type: String },
  description: { required: true, type: String },
  duration: {
    default: 0,
    max: 1440,
    min: 0,
    type: Number,
  },
  date: { default: Date.now, type: Date },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
