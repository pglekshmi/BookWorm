import {Schema,model} from 'mongoose';

const registerSchema = new Schema({
    BookId:{
        required:true,
        type:String,
        unique:true
    },
    BookName:{
        required:true,
        type:String,
        unique:true
         
    },
    Author:{
        required:true,
         type:String,
    },
    ISBN:{
        required:true,
         type:String,
         unique:true
    },
    Category:{
        required:true,
         type:String,
    },
    Copies:{
        required:true,
         type:Number,
    },
    Prize:{
        required:true,
        type:Number,
        
    }
});

const Book = model("Book",registerSchema);
export default Book;

