const {body} = require('express-validator')

const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const usernameRegex = /^(?=[a-z_\d]*[a-z])[a-z_\d]{6,}$/

const userValidation = {};

/**
 *@desc   validation for user registration
 *@params name, username, email, password, gender   
 **/
userValidation.register = [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Name is required!")
      .isLength({
        min: 2,
        max: 50,
      })
      .withMessage("Name must be between 2 to 50 characters.")
      .custom(async (name) => {
        if (name.match(/^[A-Za-z ]+$/)) {
          return true;
        } else {
          throw new Error("Name must contain only alphabets");
        }
      }),
    body("email").isEmail().withMessage("invalid email"),
    body("password")
      .matches(passwordRegex)
      .withMessage("Password must contain minimum eight characters, at least one letter and one number and one special character!"),
    body("gender").not().isEmpty().withMessage("Gender is required"),
    body('role').not().isEmpty().withMessage('role is required').custom(async(value)=>{
      if (['user' , 'admin'].includes(value)){
        return true
      }
      else{

        throw new Error('Role can only be user or admin')
      }
    }) ,
    body("confirmPassword").custom(async (confirmPassword, { req }) => {
      if (req.body.password !== confirmPassword) {
        throw new Error("Password and confirmPassword must be same!");
      }
      return true;
    }),
  ];

  userValidation.login = [
    body("email").isEmail().withMessage("Invalid email!"),
    body("password").not().isEmpty().withMessage("Password is required!"),
  ];

  userValidation.uploadpicture = [
    body("imageData").not().isEmpty().withMessage("imagedata is required!").isString().withMessage("imagedata must contain string only!"),
  ];

  userValidation.editprofile = [
    body("name").not().isEmpty().withMessage("name is required!").isString().withMessage("name must contain string only!"),
    body("bio").not().isEmpty().withMessage("bio is required!").isString().withMessage("bio must contain string only!"),
    body("gender").not().isEmpty().withMessage("gender is required!").isString().withMessage("gender must contain string only!"),
  ];

  userValidation.deactivateuser = [
    body("userId").not().isEmpty().withMessage("userId is required!").isString().withMessage("userId must contain string only!"),
  ];

  userValidation.activateuser = [
    body("userId").not().isEmpty().withMessage("userId is required!").isString().withMessage("userId must contain string only!"),
  ];

  userValidation.sendresetlink = [
    body("email").not().isEmpty().withMessage("email is required!").isString().withMessage("email must contain string only!"),
  ];

  userValidation.updatepassword = [
    body("token").not().isEmpty().withMessage("token is required!").isString().withMessage("token must contain string only!"),
    body("password").not().isEmpty().withMessage("password is required!").isString().withMessage("password must contain string only!")
  ];

  module.exports = userValidation