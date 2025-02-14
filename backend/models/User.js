const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({              //UserSchema=table name
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})
module.exports=mongoose.model('user',UserSchema)