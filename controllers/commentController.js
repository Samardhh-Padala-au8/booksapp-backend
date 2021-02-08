const { validationResult } = require("express-validator");
const Comment = require("../models/Commentmodel");
const Post = require('../models/postModel')
const pusher = require('../uttils/pusher')

const commentController = {};
/**
 *@desc     get all comments for a post
 *@route    GET /comment
 *@access   Private
 **/
commentController.getallcomments = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
      const postId = req.params.postId
      const post = Post.findOne({_id:postId})
     if(!post){
       return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"No post exist by given "}})
     }
      const comments =await Comment.find({postId}).sort({createdAt: 'descending'})
      return res.status(200).json({success:true, comments})
    } catch (error) {
    next(error);
  }
};
/**
 *@desc     Add a comment 
 *@route    POST /comment
 *@access   Private
 **/
commentController.addcomment = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
      //Create a new comment
      const userId = req._id
      const user = req.user
     const {postId, commentText} = req.body
     const post =await Post.findOne({_id:postId})
     if(!post){
       return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"No post exist by given "}})
     }
     await Post.findOneAndUpdate({_id:postId},{$inc:{comments:1},$push:{commentedusers:userId}})
     const newComment = new Comment({userId, postId, commentText, name:user.name, imagelink:user.imagelink})
     await newComment.save()
     pusher.trigger('post-events', 'postAction', { action: 'comment', postId }, req.body.socketId);
     return res.status(201).json({success:true, message:'Comment added successfully!',comment:newComment})
    } catch (error) {
    next(error);
  }
};

/**
 *@desc     Remove a comment
 *@route    DELETE /comment
 *@access   Private
 **/
commentController.removecomment = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
        const userId = req._id
       const {postId, commentId} = req.body
       const post =await Post.findOne({_id:postId})
     if(!post){
       return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"No post exist by given "}})
     }
       const comment = await Comment.findOne({_id:commentId, userId})
       if(comment){
        await Post.findOneAndUpdate({_id:postId},{$inc:{comments:-1},$pull:{commentedusers:userId}})
        await Comment.deleteOne({_id:commentId})  
        pusher.trigger('post-events', 'postAction', { action: 'uncomment', postId }, req.body.socketId);
        return res.status(200).json({success:true, message:'Comment removed successfully!'})        
       }
      return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:209, message:'You dont have permission to delete this comment!'}})
      } catch (error) {
      next(error);
    }
  };


  module.exports = commentController