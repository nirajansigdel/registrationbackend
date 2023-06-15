const express = require("express");
const loginrouter = require("../Controller/login")
const dartarouter = require("../Controller/darta")
const chalanirouter = require('../Controller/chalani')
const handoverrouter = require("../Controller/handover")
const level1router=require("../Controller/Level/userlevel")
const otprouter=require("../Controller/forgetpassword")
const forgetpasswordrouter=require("../Controller/forgetpassword")
const router = express.Router();

router.route('/login').post(loginrouter.Login)
router.route('/register').post(loginrouter.Registration)
router.route('/darta').post(dartarouter.darta)
router.route('/dartatable').get(dartarouter.dartatable)
router.route('/chalani').post(chalanirouter.chalani)
router.route('/chalanitable').get(chalanirouter.chalanitable)
router.route('/handover').post(handoverrouter.handover)
router.route('/handovertable').get(handoverrouter.handovertable)
router.route('/level1').post(level1router.level1)
router.route("/otprouter").post(otprouter.forgetpassword)
router.route("/forgetpasswordrouter").post(forgetpasswordrouter.forgetformvalidation)
module.exports = router;