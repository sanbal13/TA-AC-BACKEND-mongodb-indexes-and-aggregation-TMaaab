const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    display_name: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    questionId: [ { type: Schema.Types.ObjectId, ref: 'Question'} ],
    answerId: [ { type: Schema.Types.ObjectId, ref: 'Answer'} ],
    replyId: [ { type: Schema.Types.ObjectId, ref: 'Reply'} ],
    reputation: { type: Number }
}, { timestamps: true });

userSchema.index({display_name: 1});

module.exports = mongoose.model(User,  userSchema);