import {Schema,model} from 'mongoose';

const registerSchema = new Schema({
   
    BookName:{
        required:true,
        type:String,
        unique:true,
        immutable:true
         
    },
    Author:{
        required:true,
         type:String,
         immutable:true
    },
    ISBN:{
        required:true,
         type:String,
         unique:true,
         immutable:true
    },
    Category:{
        required:true,
         type:String,
    },
    Copies:{
        required:true,
         type:Number,
    },
    Price:{
        required:true,
        type:Number,
        
    }
});

const Book = model("Book",registerSchema);
export default Book;

