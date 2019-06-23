const ExerciseSchema = require('./exercise.schema');

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
    }

    // eslint-disable-next-line
    return new this.schema(body).save();
  }
}

module.exports = new ExerciseModel(ExerciseSchema);
