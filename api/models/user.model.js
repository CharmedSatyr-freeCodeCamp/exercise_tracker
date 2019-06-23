const UserSchema = require('./user.schema');

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
    // eslint-disable-next-line
    return new this.schema({ username }).save();
  }
}

module.exports = new UserModel(UserSchema);
