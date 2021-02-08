const mongoose = require('mongoose')

const librarySchema = new mongoose.Schema({
    collectionId:{
        type:Number,
        require:true,
    },
    userId: {
        type: String,
        required: true
      },
    bookId: {
        type: String,
        required: true
      },
   title:{
     type:String,
     required:true
   },
   image:{
    type:String,
    required:true
  }
},{
    collection: 'library'
  },{ timestamps: true })

const Library = mongoose.model("library", librarySchema);

module.exports = Library;