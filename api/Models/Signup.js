import {Schema,model} from 'mongoose';

const registerSchema = new Schema({
    FirstName:{
        required:true,
         type:String,

    },
    LastName:{
        required:true,
         type:String,
    },
    UserName:{
        required:true,
         type:String,
         unique:true
    },
    Password:{
        required:true,
         type:String,
    },
    UserRole:{
        required:true,
        type:String,
        
    }
});

const SignupDetails = model("SignUp",registerSchema);
export default SignupDetails;

