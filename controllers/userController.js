const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const utils = require('../uttils/roleconversion')
const cloudinary = require('../uttils/cloudinary')
const transporter = require('../uttils/nodemailer')
const jwt = require('jsonwebtoken')

const userController = {};

/**
 *@desc     Register new user
 *@route    POST /user/register
 *@access   Public
 **/
userController.register = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
    

    // secure flag for production mode
    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }
    //check if user wants to register as an admin and provided passcode
    if(req.body.role === 'admin'){
      if (process.env.PASSCODE !== req.body.passcode){
        return res.status(200).json({success:false, message:"PASSCODE_ERROR", error:{status:400, message:'Correct Passcode required'}})
      }
    }
    //Check if user already exist
    let existingUser = await User.findOne({ email: req.body.email });
    const rolecode = utils.convertroletorolecode(req.body.role)
    if (existingUser) {
    // If user signes up for diffrent role with same id. 
     if (existingUser.role.includes(rolecode)){
      res.status(200).json({ success: false, message: "AUTH_ERROR", error: { status: 409, msg: "User already exist! Please login." } });
     }
     else{
       existingUser.role.push(rolecode)
       await existingUser.save()
       const token = await existingUser.generateAuthToken()
       return res.status(200).json({success:true,message:'Registered successfully!', user:{name:existingUser.name, email:existingUser.email,gender:existingUser.gender,imagelink:existingUser.imagelink, role:existingUser.role}, token})
     }
      
    } else {
      // Create a new user
      const user = new User(req.body);
      await user.save();
      const token = await user.generateAuthToken()
      return res.status(200).json({success:true,message:'Registered successfully!', user:{name:user.name, email:user.email,gender:user.gender,imagelink:user.imagelink, role:user.role}, token})
    }
  } catch (error) {
    next(error);
  }
};


/**
 *@desc     Login user
 *@route    POST /user/login
 *@access   Public
 **/
userController.login = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
    //Check if user exist
   const user = await User.findByCredentials(req.body.email, req.body.password)
   if (user === 'password incorrect'){
    return res.status(200).json({success:false, message:'AUTH_ERROR', error:{status:400, message:'Password incorrect!'}})
   }
   if (user){
      const token = await user.generateAuthToken()
      return res.status(200).json({success:true,message:'Logged in successfully!', user:{_id:user._id,name:user.name, email:user.email,gender:user.gender,imagelink:user.imagelink, role:user.role}, token})
   }
   else{
     return res.status(200).json({success:false, message:'AUTH_ERROR', error:{status:400, message:'User doesnt exist! Please register first.'}})
   }
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Logout User
 *@route    POST /user/logout
 *@access   Private
 **/

userController.logout = async function (req, res, next) {
  try {
   const user =req.user
   user.tokens = user.tokens.filter((token) => {
    return token.token != req.token;
  });
  await user.save()
  res.status(200).json({success:true, message:'Logged out successfully!'})
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Logout User from all devices
 *@route    POST /user/logoutall
 *@access   Private
 **/
userController.logoutall = async function (req, res, next) {
  try {
   const user =req.user
   user.tokens.splice(0, user.tokens.length)
  await user.save()
  return res.status(200).json({success:true, message:'Logged out from all devices successfully!'})
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Get Use profile
 *@route    GET /user
 *@access   Private
 **/
userController.getprofile = async function (req, res, next) {
  try {
   const user = req.user
   const objectuser = user.toObject()
   delete objectuser.tokens
  return res.status(200).json({success:true, userProfile:objectuser})
  } catch (error) {
    next(error);
  }
};


/**
 *@desc     Get all users
 *@route    GET /user/all
 *@access   Private
 **/
userController.getallusers = async function (req, res, next) {
  try {
   const users =await User.find({}).select('name email imagelink isActive')
  return res.status(200).json({success:true, users})
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Get a user profile
 *@route    GET /user/:id
 *@access   Private
 **/
userController.getuserprofile = async function (req, res, next) {
  try {
    const userid = req.params.id
   const user =await User.findOne({_id:userid}).select('name email imagelink bio gender')
  return res.status(200).json({success:true, user})
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Deactivate a User
 *@route    UPDATE /user/deactivate
 *@access   Private
 **/
userController.deactivateuser = async function (req, res, next) {
  try {
    const userId = req.body.userId
   await User.updateOne({_id:userId},{isActive:false},(err, result)=>{
     if(err){ next(err)}
     return res.status(200).json({success:true, message:'User decativated successfully!'})
    })
  
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Activate a User
 *@route    UPDATE /user/activate
 *@access   Private
 **/
userController.activateuser = async function (req, res, next) {
  try {
    const userId = req.body.userId
   await User.updateOne({_id:userId},{isActive:true},(err, result)=>{
     if(err){ next(err)}
     return res.status(200).json({success:true, message:'User activated successfully!'})
    })
  
  } catch (error) {
    next(error);
  }
};
/**
 *@desc     Update User profile
 *@route    PUT /user
 *@access   Private
 **/
userController.editprofile = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
   let user = req.user
  user.updateOne({...req.body},{new: true},(err, newuser)=>{
    if(err) {
    throw(err)
    }
    return res.status(200).json({success:true,user:{_id:newuser._id,name:newuser.name, email:newuser.email,gender:newuser.gender,imagelink:newuser.imagelink}, message:'User updated Successfully!'})
  })
  
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Upload profile pic
 *@route    POST /user/uploadfile
 *@access   Private
 **/
userController.uploadpicture = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
   const {imageData} = req.body
   const user = req.user
   const uploadResponse = await cloudinary.uploader.upload(imageData, {
    upload_preset: 'default-preset',
    });
    user.updateOne({imagelink:uploadResponse.url},(err, result)=>{
      if(err){
        console.log(err)
        next(err)
      }
      return res.status(200).json({success:true,user, message:"Picture uploaded successfully!"})

    })
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Send password reset link
 *@route    POST /user/resetpassword
 *@access   Public
 **/
userController.sendresetlink = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
    const email = req.body.email
    const user =await User.findOne({email}) 
    if (user){
      const token = await user.generateAuthToken()
      const mailOptions={
        to: req.body.email,
        subject: "Reset password for BooksApp",
        html: `<h3>You are recieving this mail because you have requested for password reset for your BooksApp account. Click the below link to change your password.</h3><br><p><a href=${process.env.FRONT_END_BASE_URL}/resetpassword/${token}>Click here to reset your password</a></p>`
     };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          next(error)
      }
      return res.status(200).json({success:true, message:"Please check your mail for reset link!"})
  });
    }
    else{
      return res.status(200).json({success:false, message:"CONFLICT_ERR", error:{status:409, message:"User does't exist, please register!"}})
    }
  } catch (error) {
    next(error);
  }
};

/**
 *@desc     Verify token and reset password
 *@route    PUT /user/updatepassword
 *@access   Private
 **/
userController.updatepassword = async function (req, res, next) {
  if (!validationResult(req).isEmpty()) {
    //Check if there is any validation error.
    return res
      .status(200)
      .json({ success: false, message: "VALIDATION_ERROR", error: { status: 400, errors: validationResult(req).mapped() } });
  }
  try {
    console.log('back')
      const token = req.body.token
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      const userId = decoded._id
      const user =await User.findOne({_id:userId})
      user.password = req.body.password
      await user.save()
      return res.status(200).json({success:true, message:'Password updated successfully, login now!'})
   
  } catch (error) {
    next(error);
  }
};
module.exports = userController
