var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: Number,
    required: true,
    default: 1
  }
}, { collection: 'lob' });

module.exports = mongoose.model('Lob', lobSchema);
