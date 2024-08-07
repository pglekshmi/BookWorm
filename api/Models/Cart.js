import {Schema,model,mongoose} from 'mongoose';

const registerSchema = new Schema({
    UserId:{
        required:true,
        type: mongoose.Schema.Types.ObjectId,
        ref:'Signup',
        
    },
    items:[{
    BookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true
        
    },
   
    Quantity:{
        required:true,
         type:Number,
    }
}]

});

const Cart = model("Cart",registerSchema);
export default Cart;

