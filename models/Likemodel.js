const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
      },
    postId: {
        type: String,
        required: true
      }
},{ timestamps: true },{
    collection: 'likes'
  })

const Like = mongoose.model("like", likeSchema);

module.exports = Like;