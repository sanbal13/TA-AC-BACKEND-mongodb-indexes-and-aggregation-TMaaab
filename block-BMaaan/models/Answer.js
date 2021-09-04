const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    questionId: {type: Schema.Types.ObjectId, ref: 'Answer'},
    replyId: [{type: Schema.Types.ObjectId, ref: 'Reply'}],   
    upvote: {type: Number},
    downvote: {type: Number},
});

module.exports = mongoose.model(Answer,  answerSchema);


