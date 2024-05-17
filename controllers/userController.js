const userModel=require("../models/userModel");



//login controller....
const loginContoller=async(req,res)=>{
       try {
            const {email,password}=req.body;
            const user=await userModel.findOne({email,password});
            if(!user){
                return res.status(404).send({message:"user not present"});
            }
            res.status(200).send({
              success:true,
              user
            });
       } catch (error) {
            res.status(400).send({
              success:false,
              error:error
            })
       }
};

//register controller....
const registerController=async(req,res)=>{
      try {
           const newUser=new userModel(req.body);
           await newUser.save();
           res.status(200).send({success:true,newUser});
      } catch (error) {
         res.status(400).send({sucess:false,error})
      }
}
//for google authorization....
 const googleController=async(req,res)=>{
     try {
        const {name,email,photo}=req.body
        let user=await userModel.findOne({email:req.body.email});
        if(!user){
           const password=Math.random().toString(36).slice(-8);
            const newuser=new userModel({
               name,
               email,
               photo,
               password
            }) 
            await newuser.save();
            user=await userModel.findOne({email});
        }
 
        res.status(200).send(user)
        }  
      catch (error) {
           console.log(error);
     }

}

const updateController=async(req,res)=>{
       try {
         
          await userModel.updateOne({_id:req.body.userId},{name:req.body.name,email:req.body.email,photo:req.body.photo})
          const user=await userModel.findOne({email:req.body.email});
          res.status(200).send(user);
          
       } catch (error) {
          console.log(error);
       }
}

const deleteController=async(req,res)=>{
   try {
       await userModel.findByIdAndDelete({_id:req.body.userId})
       res.status(200).send({msg:"User deleted SuccessFully"});
   } catch (error) {
      console.log(error)
   }
}

module.exports={loginContoller,registerController,googleController,updateController,deleteController};