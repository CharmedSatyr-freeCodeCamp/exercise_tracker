const mongoose = require('mongoose');

require('./exercise.schema');

const UserSchema = new mongoose.Schema(
  {
    username: { required: true, type: String, unique: true },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } },
);

// The name in quotes is the name of the join. Use it to invoke `populate` (see exercise.model.js)
UserSchema.virtual('exercises', {
  ref: 'Exercise', // The model to join with.
  localField: '_id', // local field should match...
  foreignField: 'userId', // ...the field in the other model.
  justOne: false, // Get an array of matches.
});

module.exports = mongoose.model('User', UserSchema);
