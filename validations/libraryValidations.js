const {body, param} = require('express-validator')

const libarayValidation = {};

/**
 *@desc   validation for adding book to library
 *@params  collectionId, bookId   
 **/
libarayValidation.addbook = [
    body("collectionId")
      .not()
      .isEmpty()
      .withMessage("Id is required!"),
      body("image")
      .not()
      .isEmpty()
      .withMessage("image is required!"),
    body("bookId")
      .not()
      .isEmpty()
      .withMessage("bookId is required!"),
    body("title")
      .not()
      .isEmpty()
      .withMessage("title is required!")
  ];


  /**
 *@desc   validation for deleting book from library
 *@params  id   
 **/
libarayValidation.deletebook = [
    param("id")
      .not()
      .isEmpty()
      .withMessage("bookId is required!")
  ];
 /**
 *@desc   validation for getting a user's library
 *@params  userId 
 **/
libarayValidation.getuserlibrary = [
  param("userId")
    .not()
    .isEmpty()
    .withMessage("userId is required!")
];



  module.exports = libarayValidation