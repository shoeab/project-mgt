var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subLobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  lob_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'lob'
  },
  status: {
    type: Number,
    required: true,
    default: 1
  }
}, { collection: 'sub_lob' });

module.exports = mongoose.model('SubLob', subLobSchema);
