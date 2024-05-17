const express=require("express");
const { loginContoller, registerController, googleController, updateController, deleteController} = require("../controllers/userController");

const router=express.Router();

router.post("/login",loginContoller);
router.post("/register",registerController);
router.post("/google",googleController);
router.post("/update",updateController);
router.post("/delete",deleteController);


module.exports=router;