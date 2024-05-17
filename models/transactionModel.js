const mongoose=require("mongoose");

const TransactionSchema=new mongoose.Schema({
    userId:{
         type:String,
         required:true,
    },
    amount:{
        type:Number,
        required:[true,"Amount is required"],
    },
    type:{
      type:String,
      required:[true,"Type is required"],
    },
    category:{
        type:String,
        required:[true,"category is reguired"],
    },
    refernce:{
          type:String,
    },
    date:{
      type:Date,
      required:[true,"Date is required"],
    },
});

const transactionModel=mongoose.model("transaction",TransactionSchema);
  module.exports=transactionModel;