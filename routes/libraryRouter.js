const express = require('express')
const router = express.Router()
const libraryController = require('../controllers/libraryController')
const libraryValidations = require('../validations/libraryValidations')
const auth = require('../middlewares/auth')


router.post('/',auth, libraryValidations.addbook, libraryController.addbook)
router.delete('/:id',auth,libraryValidations.deletebook, libraryController.deletebook)
router.get('/',auth, libraryController.getbook)
router.get('/:userId', auth, libraryValidations.getuserlibrary, libraryController.getuserlibrary)



module.exports = router