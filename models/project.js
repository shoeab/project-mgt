var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  sub_lob_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'sub_lob'
  },
  status: {
    type: Number,
    required: true,
    default: 1
  },
  year: {
    type: Number,
    required: true,
    default: 0
  },
  quarter: {
    type: String,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  no_of_members: {
    type: Number,
    required: true
  }
}, { collection: 'project' });

module.exports = mongoose.model('Project', projectSchema);
