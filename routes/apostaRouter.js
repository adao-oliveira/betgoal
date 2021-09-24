const router = require('express').Router()
const apostaCtrl = require('../controllers/apostaCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/apostar')
    .get(apostaCtrl.getApostar)
    .post(auth, authAdmin, apostaCtrl.publicarAposta)


router.route('/apostar/:id')
    .delete(auth, authAdmin, apostaCtrl.deleteAposta)
    .put(auth, authAdmin, apostaCtrl.updateAposta)



module.exports = router