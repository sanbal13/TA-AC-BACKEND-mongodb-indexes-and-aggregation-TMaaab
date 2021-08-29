const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    description: String,
    tags: [String],
});

articleSchema.index({ tags: 1 });
articleSchema.index({title: "text", description:"text"});

modules.export = mongoose.Model('Article', articleSchema);