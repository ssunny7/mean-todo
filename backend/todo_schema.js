var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
	title: String,
	description: String,
	completed: Boolean
});
mongoose.model('Todo', TodoSchema);

module.exports = mongoose.model('Todo');
