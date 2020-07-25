const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({

    id:{
        type: Number,
        required: true
    },
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    }
});

const todo = mongoose.model('todo',TodoSchema);
module.exports = todo;