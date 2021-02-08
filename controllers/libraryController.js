const { validationResult } = require("express-validator");
const Library = require("../models/libraryModel");

const libraryController = {};

/**
 *@desc     Add a book to library
 *@route    POST /libary
 *@access   Private
 **/
libraryController.addbook = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
      const { bookId, title,collectionId, image} = req.body
    //check if book already exist in this collection
    const book = await Library.findOne({userId:req._id,bookId})
    if(book){
        return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:403, message:'Book already exist!'}})
    }
    else{
    //crate a new entry
    const book = new Library({bookId,userId:req._id, title,collectionId, image })
    await book.save()
    return res.status(201).json({success:true, message:"Successfully added book!"})
    }
    } catch (error) {
    next(error);
  }
};


/**
 *@desc     Delete book to library
 *@route    DELETE /libary
 *@access   Private
 **/
libraryController.deletebook = async function (req, res, next) {
    if (!validationResult(req).isEmpty()) {
      //Check if there is any validation error.
      return res
        .status(200)
        .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
    }
    try {
        const  bookId = req.params.id
      //check if book already exist in this collection
      const book = await Library.findOne({userId:req._id,bookId})
      if(book){
         await Library.deleteOne({userId:req._id,bookId})
         return res.status(200).json({success:true, message:'Book deleted Successfully!'})
      }
      else{
    // if book is not present in library
      return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"Book doesn't exist!"}})
      }
      } catch (error) {
      next(error);
    }
  };


  /**
 *@desc     GET book from library
 *@route    GET /libary
 *@access   Private
 **/
libraryController.getbook = async function (req, res, next) {
    try {
      const {collectionId} = req.query
      if(collectionId){
        const books = await Library.find({userId:req._id, collectionId:Number(collectionId)})
        return res.status(200).json({success:true, collection:books})
      }
      else{
        const books = await Library.find({userId:req._id})
        return res.status(200).json({success:true, collection:books})
      }
      } catch (error) {
      next(error);
    }
  };

  /**
 *@desc     GET library of a user
 *@route    GET /libary/:userId
 *@access   Private
 **/
libraryController.getuserlibrary = async function (req, res, next) {
  try {
    const userId = req.params.userId
    const userLibrary =await Library.find({userId})
    return res.status(200).json({success:true, collection:userLibrary})
    } catch (error) {
    next(error);
  }
};
module.exports = libraryController