const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const postValidations = require('../validations/postValidations')
const auth = require('../middlewares/auth')


router.post('/',auth, postValidations.addpost, postController.addpost)
router.delete('/',auth,postValidations.deletepost, postController.deletepost)
router.put('/',auth, postValidations.editpost, postController.editpost)
router.get('/', auth, postController.getallposts)
router.get('/user', auth, postController.getuserposts)



module.exports = router