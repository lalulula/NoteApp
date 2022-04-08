//Models are defined using the Schema interface
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        text: {type: String},
        lastUpdatedDate: {type: Date, default: new Date()},
        tags: [{type: String}]

    }
);
//Export model
module.exports = mongoose.model('Note', NoteSchema);
