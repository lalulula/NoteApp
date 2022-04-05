//Models are defined using the Schema interface
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        text: {type: String},
        lastUpdatedDate: {type: Date, default: Date.now()},
        tags: [{type: String}]

    }
);

// NoteSchema.virtual('text').get(function () {
//         return this.text;
//     });

// NoteSchema.virtual('lastUpdatedDate').get(function () {
//         return this.lastUpdatedDate;
//     });

//Export model
module.exports = mongoose.model('Note', NoteSchema);
