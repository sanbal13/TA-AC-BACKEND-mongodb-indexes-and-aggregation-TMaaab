const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {type: String, required: true},
    userId: {type: Schema.Types.userId, ref: 'User'},
    answerId: [{type: Schema.Types.userId, ref: 'Answer'}],
    replyId: [{type: Schema.Types.userId, ref: 'Reply'}],
    tags:[{type: String}],
    views: [{type: Date}],
    upvote: {type: Number},
    downvote: {type: Number},
});

questionSchema.index({ question: 1 });
questionSchema.index({ tags: 1});


module.exports = mongoose.model(Question,  questionSchema);