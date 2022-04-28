//Models are defined using the Schema interface
const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        text: {type: String},
        lastUpdatedDate: {type: Date, default: Date.now},
        tags: [ {id: String, text: String} ],
        agent: { type: Schema.Types.ObjectId, ref: 'User', required: false }
    },{versionKey: false }
);
//Export model
module.exports = mongoose.model('Note', NoteSchema);
