const {body} = require('express-validator')

const likeValidation = {};

/**
 *@desc   validation for adding a like
 *@params   postId 
 **/
likeValidation.addlike = [
    body("postId")
    .exists()
    .withMessage("postId is required")
      .not()
      .isEmpty()
      .withMessage("postId is required")
  ];

  /**
 *@desc   validation for removing a like
 *@params   postId 
 **/
likeValidation.removelike = [
    body("postId")
    .exists()
    .withMessage("postId is required")
      .not()
      .isEmpty()
      .withMessage("postId is required")
  ];

  /**
 *@desc   validation for checking if user has liked the post
 *@params  postId
 **/
likeValidation.checkuserlike = [
    body("postId")
    .exists()
    .withMessage("postId is required!")
      .not()
      .isEmpty()
      .withMessage("postId is required!"),
  ];

  module.exports = likeValidation