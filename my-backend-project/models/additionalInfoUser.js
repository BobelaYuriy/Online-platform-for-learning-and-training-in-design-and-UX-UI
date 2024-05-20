const { Schema, model } = require('mongoose');

const userInfo = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    city: { type: String },
    age: { type: String },
    sex: { type: String },
    coursesTaken: [String],
    certificates: [String]
})
module.exports = model('usersInfo', userInfo);
