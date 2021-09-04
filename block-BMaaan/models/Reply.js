const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
    reply: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    questionId: {type: Schema.Types.ObjectId, ref: 'Question'},
    answerId: [{type: Schema.Types.ObjectId, ref: 'Answer'}],   
    upvote: {type: Number},
    downvote: {type: Number},
});

module.exports = mongoose.model(Reply,  replySchema);


