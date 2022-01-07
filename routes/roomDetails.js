var express = require("express");
var router = express.Router();
var roomDetailsModule = require('../module/roomDetailsModule');

router.get("/get", roomDetailsModule.getroomDetails);
router.get("/roomsStatus", roomDetailsModule.getroomDetails);


module.exports = router;