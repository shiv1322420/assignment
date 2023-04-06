const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        unique:true,
        required: true,
      },
      description: {
        type: String,
        sparse: true
      },
   
});


module.exports = mongoose.model('notes', notesSchema);