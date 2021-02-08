const { validationResult } = require("express-validator");
const Post = require("../models/postModel");



const postController = {};

/**
 *@desc     Add a post 
 *@route    POST /post
 *@access   Private
 **/
postController.addpost = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
      //Create a new post
      const user = req.user
      const {bookId, bookTitle, postText} = req.body
      const newPost = new Post({userId:req._id,name:user.name,image:user.imagelink,bookTitle,bookId,postText,likes:0,comments:0})
      await newPost.save()
      res.status(201).json({success:true,post:newPost, message:'Post has been created successfully!'})
    } catch (error) {
    next(error);
  }
};

/**
 *@desc     Delete a post
 *@route    DELETE /post
 *@access   Private
 **/
postController.deletepost = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
        const { postId } = req.body
      //check if post exist by the user
      const post = await Post.findOne({_id:postId, userId:req._id})
      if(post){
         await Post.deleteOne({userId:req._id, _id:postId})
         return res.status(200).json({success:true, message:'Post deleted Successfully!'})
      }
      else{
    // if post is not present
      return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"Post doesn't exist!"}})
      }
      } catch (error) {
      next(error);
    }
  };


  /**
 *@desc     Get all posts
 *@route    GET /posts
 *@access   Private
 **/
postController.getallposts = async function (req, res, next) {
    try {
      const posts = await Post.find({}).sort({createdAt: 'descending'})
      res.status(200).json({success:true, posts})
    } catch (error) {
      next(error);
    }
  };

   /**
 *@desc     Get all posts of a user
 *@route    GET /post/user
 *@access   Private
 **/
postController.getuserposts = async function (req, res, next) {
    try {
      const posts = await Post.find({userId:req._id})
      res.status(200).json({success:true, posts})
    } catch (error) {
      next(error);
    }
  };

   /**
 *@desc    Edit
 *@route   PUT /post
 *@access   Private
 **/
postController.editpost = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
        //Check if there is any validation error.
        return res
          .status(200)
          .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
      }
    try {
        const { postId } = req.body
        //check if post already exist by the user
        const post = await Post.findOne({_id:postId, userId:req._id})
        if(post){
           await Post.updateOne({userId:req._id, ...req.body})
           return res.status(200).json({success:true, message:'Post updated Successfully!'})
        }
        else{
      // if post is not present
        return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"Post doesn't exist!"}})
        }
    } catch (error) {
      next(error);
    }
  };



module.exports = postController