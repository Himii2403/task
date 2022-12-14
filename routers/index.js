const router = require("express").Router()
const userController = require("../controller/index")

const {validate} = require("../middleware/index")
const schema = require("./schema")
const {verifyToken} = require("../middleware/jwt")

router.post("/saveUser", validate(schema.addUser),userController.isEmailExist ,userController.singnup)
router.get("/getUser", userController.getUserInformation)
router.put("/updateUser", userController.updateUser)
router.delete("/delete", userController.deleteUser)
router.get("/login",validate(schema.login), userController.login)
router.put("/follow",validate(schema.follow), verifyToken,userController.followOtherUser)


module.exports = router