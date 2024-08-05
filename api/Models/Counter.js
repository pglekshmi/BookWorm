import {Schema,model} from 'mongoose';

const registerSchema = new Schema({
    Id:{
        type:String,
        default:"BookId"  
         },
    Seq:{
        
         type:Number,
         default:1
    },
    
});

const Counter = model("Counter",registerSchema);
export default Counter;

