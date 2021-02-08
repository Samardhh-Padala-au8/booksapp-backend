const express = require('express')
const router = express.Router()
const likeController = require('../controllers/likeController')
const likeValidation = require('../validations/likeValidations')
const auth = require('../middlewares/auth')


router.post('/',auth, likeValidation.addlike, likeController.addlike)
router.delete('/',auth,likeValidation.removelike, likeController.removelike)
router.get('/user', auth, likeValidation.checkuserlike, likeController.checkuserlike)



module.exports = router