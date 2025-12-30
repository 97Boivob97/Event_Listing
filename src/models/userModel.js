import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name:{type:String,required:true,trim:true,minlength:[3,"name must be at least 3 characters"]},
    email:{type:String,required:true,lowercase:true,unique:true,match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
        "Please enter a valid email address"]},
    password:{type:String,required:true,select:false,minlength:[8,"password must be at least 8 characters"]}
},{timestamps:true,versionKey:false});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



userSchema.methods.isMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model("User",userSchema);
export default User;