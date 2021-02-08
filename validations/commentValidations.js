const {body, param} = require('express-validator')

const commentValidation = {};



/**
 *@desc   get all comment for a post
 *@params  postId, userid 
 **/
commentValidation.getallcomments = [
  param("postId")
  .exists()
  .withMessage("postId is required")
    .not()
    .isEmpty()
    .withMessage("postId must not be empty"),
  ];

/**
 *@desc   validation for adding a comment
 *@params  userId, postId, commentText 
 **/
commentValidation.addcomment = [
    body("postId")
    .exists()
    .withMessage("postId is required")
      .not()
      .isEmpty()
      .withMessage("postId is required"),
      body("commentText")
      .exists()
      .withMessage("commentText is required")
      .not()
      .isEmpty()
      .withMessage("commentText is required"),


  ];

  /**
 *@desc   validation for removing a comment
 *@params  userId, postId, commentId
 **/
commentValidation.removecomment = [
    body("postId")
    .exists()
    .withMessage("postId is required")
      .not()
      .isEmpty()
      .withMessage("postId is required"),
      body('commentId')
      .exists()
    .withMessage("commentId is required")
      .not()
      .isEmpty()
      .withMessage("commentId is required")
  ];


  module.exports = commentValidation