const { validationResult } = require("express-validator");
const Like = require("../models/Likemodel");
const Post = require('../models/postModel')
const pusher = require('../uttils/pusher')

const likeController = {};

/**
 *@desc     Add a like 
 *@route    POST /like
 *@access   Private
 **/
likeController.addlike = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
      //Create a new like
      const userId = req._id
     const {postId} = req.body
     const post = Post.findOne({_id:postId})
     if(!post){
       return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"No post exist by given "}})
     }
     const like = await Like.findOne({userId,postId})
     if(like){
         return res.status(200).json({success:false, message:"CONFLICT ERR", error:{status:409, message:"Already a like exist by the user for this post!"}})
     }
     await Post.findOneAndUpdate({_id:postId},{$inc:{likes:1},$push:{likedusers:userId}})
     const newLike = new Like({userId, postId})
     await newLike.save()
     pusher.trigger('post-events', 'postAction', { action: 'like', postId }, req.body.socketId);
     return res.status(201).json({success:true, message:'Like added successfully!'})
    } catch (error) {
    next(error);
  }
};

/**
 *@desc     Remove a like 
 *@route    DELETE /like
 *@access   Private
 **/
likeController.removelike = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
        //check if like exists
        const userId = req._id
       const {postId} = req.body
       const post = Post.findOne({_id:postId})
     if(!post){
       return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"No post exist by given "}})
     }
       const like = await Like.findOne({userId,postId})
       if(like){
        await Post.findOneAndUpdate({_id:postId},{$inc:{likes:-1},$pull:{likedusers:userId}})
        await Like.deleteOne({userId, postId})  
        pusher.trigger('post-events', 'postAction', { action: 'unlike', postId }, req.body.socketId);
        return res.status(200).json({success:true, message:'Like removed successfully!'})        
       }
      return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:209, message:'Like doesnt exist for this user.'}})
      } catch (error) {
      next(error);
    }
  };

/**
 *@desc     check if a like exist for the user for a post
 *@route    GET /like/user
 *@access   Private
 **/
  likeController.checkuserlike = async function(req, res, next){
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try{
      const userId = req._id
      const {postId} = req.body
      const like = Like.findOne({userId,postId})
      if(like){
        return res.status(200).json({success:true, found:true})
      }
      else{
        return res.status(200).json({success:false, found:false})
      }
    }
    catch(err){
      next(err)
    }
  }

  module.exports = likeController