const { model } = require("mongoose");
const { addTransaction, getTransaction,editTransaction ,deleteTransaction} = require( "../controllers/transactionController");

const express=require("express");
  
const router=express.Router();

router.post("/add-transaction",addTransaction);
router.post("/get-transaction",getTransaction);
//edit route....
router.post("/edit-transaction",editTransaction);

//Delete route....
router.post("/Delete-transaction",deleteTransaction);

module.exports=router;