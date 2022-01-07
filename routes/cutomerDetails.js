var express = require("express");
var router = express.Router();
var customerDetailsModule = require('../module/cutomerDetailsmodule');
const authorize = require("../module/Authorize");

router.get(
  "/get",
  authorize.AuthorizeUser,
  customerDetailsModule.getcustomerDetails
);
router.post("/create", customerDetailsModule.createCustomer);
router.post("/login", customerDetailsModule.login);
router.get("/customerStatus", customerDetailsModule.createCustomer);





module.exports = router;