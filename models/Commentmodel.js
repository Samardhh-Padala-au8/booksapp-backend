const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
      },
    postId: {
        type: String,
        required: true
      },
    commentText:{
        type:String,
        required:true
    },
    name:{
      type:String,
      required:true
  },
  imagelink:{
    type:String,
    required:true
}
    
},{ timestamps: true },{
    collection: 'comments'
  })

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;