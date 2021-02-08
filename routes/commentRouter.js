const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')
const commentValidation = require('../validations/commentValidations')
const auth = require('../middlewares/auth')


router.post('/',auth, commentValidation.addcomment, commentController.addcomment)
router.delete('/',auth,commentValidation.removecomment, commentController.removecomment)
router.get('/:postId',auth,commentValidation.getallcomments, commentController.getallcomments)



module.exports = router