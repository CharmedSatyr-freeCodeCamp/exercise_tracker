const userSchema = require('./user.schema');

class UserModel {
  constructor(schema) {
    this.schema = schema;
  }

  get(id, options = 'exercises') {
    return id
      ? this.schema
        .findById(id)
        .populate(options)
        .exec()
      : this.schema.find({});
  }

  post(username) {
    return new this.schema({ username }).save();
  }
}

module.exports = new UserModel(userSchema);
