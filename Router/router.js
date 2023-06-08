const express=require("express");
const loginrouter=require("../Controller/login")
const dartarouter=require("../Controller/darta")
const router=express.Router();

router.route('/login').post(loginrouter.Login)
router.route('/register').post(loginrouter.Registration)
router.route('/darta').post(dartarouter.darta)
router.route('/dartatable').get(dartarouter.dartatabel)


module.exports = router;