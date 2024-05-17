const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
     name:{
          type:String,
          required:[true,"Username is required"]
     },
     email:{
         type:String,
         required:[true,"Emial is required"],
         unique:true
     },
     password:{
        type:String,
        required:[true,"Password is required"]
     },
     photo:{
          type:String,
          default:"https://th.bing.com/th/id/OIP.3IsXMskZyheEWqtE3Dr7JwHaGe?rs=1&pid=ImgDetMain"
       }
},
 {timestamps:true});

 //exports....
const userModel=mongoose.model("user",userSchema);
  module.exports=userModel;