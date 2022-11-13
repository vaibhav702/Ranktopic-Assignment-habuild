const express = require('express');
const router = express.Router();

const userControl=require("../controller/userController")
const topicControl=require('../controller/rankController')
const middleware=require("../middleware/middleware")

router.post("/login",userControl.loginUser)

router.post("/register",userControl.userCreation)

router.post("/addTopic",middleware. userAuth,topicControl. addTopics)

router.put("/updateTopic/:topicId",middleware. userAuth,topicControl.updateRankDetails)

 router.get("/getRankDetails",middleware. userAuth,topicControl.getRankDetails)

module.exports = router;