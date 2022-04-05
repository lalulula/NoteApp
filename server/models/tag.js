var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TagSchema = new Schema(
    {
        tags: {type: String},
    }
);

TagSchema.virtual('tags').get(function () {
        return this.tags;
    });


//Export model
module.exports = mongoose.model('Tag', TagSchema);
