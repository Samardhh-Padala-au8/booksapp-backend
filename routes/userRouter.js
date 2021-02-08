const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userValidations = require('../validations/userValidations')
const auth = require('../middlewares/auth')
const checkrole = require('../middlewares/checkRole')

router.post('/register', userValidations.register, userController.register)
router.post('/login', userValidations.login, userController.login)
router.post('/logout', auth, userController.logout)
router.post('/logoutall', auth, userController.logoutall)
router.get('/', auth, userController.getprofile)
router.put('/', auth, userValidations.editprofile, userController.editprofile)
router.post('/uploadfile', auth, userValidations.uploadpicture, userController.uploadpicture)
router.get('/all',auth, userController.getallusers)
router.get('/:id',auth, userController.getuserprofile)
router.put('/deactivate', auth, checkrole(2), userValidations.deactivateuser, userController.deactivateuser)
router.put('/activate', auth, checkrole(2), userValidations.activateuser, userController.activateuser)
router.post('/resetpassword', userValidations.sendresetlink, userController.sendresetlink)
router.put('/updatepassword', userValidations.updatepassword, userController.updatepassword)




module.exports = router