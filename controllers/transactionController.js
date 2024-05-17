const transactionModel = require("../models/transactionModel");
const moment =require ("moment");

const addTransaction=async(req,res)=>{
         try {
          const newtransactionModel=new transactionModel(req.body);
          await newtransactionModel.save();
          res.status(201).send({success:true,msg:"Transaction is  added successfully"});
         } catch (error) {
              res.status(500).send({success:false,error});
         }
};

const getTransaction=async(req,res)=>{
       try {
         const {frequency,selectDate,type}=req.body;
        const transaction= await transactionModel.find({
         ...(frequency!=="custom"?{
          date:{
               $gt:moment().subtract(Number(frequency),"d").toDate(),    
            }
         }:{
          date:{
               $gte:selectDate[0],
               $lte:selectDate[1],
          }
         }),
         ...(type!=="all" && {type}),
          userId:req.body.userId});
        res.status(200).send({sucess:true,transaction});
       } catch (error) {
            res.stat(500).send({success:false,error});
       }
};

const editTransaction=async(req,res)=>{
       try {
            await transactionModel.findOneAndUpdate({_id:req.body.transactionId},req.body.payload);
           res.status(201).send({success:true});
       } catch (error) {
          res.status(500).send(error);
       }
}

const deleteTransaction=async(req,res)=>{
     try{
       await transactionModel.findOneAndDelete({_id:req.body.transactionId})
       res.status(200).send({success:true});
     }catch(error){
         res.status(500).send(error);   
     }
}

module.exports={getTransaction,addTransaction,editTransaction,deleteTransaction};