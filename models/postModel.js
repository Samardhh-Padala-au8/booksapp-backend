const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
      },
    bookId: {
        type: String,
        required: true
      },
    postText: {
        type: String,
        required:true
    },
    name:{
      type:String,
      required:true
    },
    image:{
      type:String,
      required:true
    },
    bookTitle:{
      type:String,
      required:true
    },
    likes:{
        type:Number
    },
    comments:{
        type:Number
    },
    likedusers:[],
    commentedusers:[]
},{ timestamps: true },{
    collection: 'posts'
  })

const Post = mongoose.model("post", postSchema);

module.exports = Post;