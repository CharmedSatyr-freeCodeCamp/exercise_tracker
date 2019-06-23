const exerciseSchema = require('./exercise.schema');

class ExerciseModel {
  constructor(schema) {
    this.schema = schema;
  }

  get() {
    return this.schema.find();
  }

  post(body) {
    if (!body.duration) {
      body.duration = 0;
    }

    if (!body.date) {
      body.date = Date.now();
      console.log(body.date);
    }

    try {
      return new this.schema(body).save();
      // .populate('users')
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new ExerciseModel(exerciseSchema);
