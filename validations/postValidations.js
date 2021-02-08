const {body} = require('express-validator')

const postValidation = {};

/**
 *@desc   validation for creating a post
 *@params  userId, bookId, postText   
 **/
postValidation.addpost = [
    body("bookId")
      .not()
      .isEmpty()
      .withMessage("bookId is required!"),
      body("bookTitle")
      .not()
      .isEmpty()
      .withMessage("Book title is required!"),
    body("postText")
      .not()
      .isEmpty()
      .withMessage("postText is required!")
      .isLength({
        min: 5,
        max: 280,
      })
      .withMessage("Name must be between 5 to 280 characters.")
  ];


  /**
 *@desc   validation for deleting a post
 *@params  bookId   
 **/
postValidation.deletepost = [
    body("postId")
      .not()
      .isEmpty()
      .withMessage("postId is required to delete a post!")
  ];

/**
 *@desc   validation for editing a post
 *@params  bookId, postId, postText
 **/
postValidation.editpost = [
    body("bookId")
      .not()
      .isEmpty()
      .withMessage("bookId is required!"),
    body("postId")
    .exists()
    .withMessage("postId is required!")
      .not()
      .isEmpty()
      .withMessage("postId is required!"),
    body("postText")
      .not()
      .isEmpty()
      .withMessage("postText is required!")
      .isLength({
        min: 5,
        max: 280,
      })
      .withMessage("Name must be between 5 to 280 characters.")
  ];




  module.exports = postValidation