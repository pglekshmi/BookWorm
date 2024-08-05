import mongoose from 'mongoose';

// const db ={};
// db.mongoose=mongoose;

const db=mongoose;

db.connect("mongodb://127.0.0.1:27017/BookWorm")
    .then(()=>
    {
        console.log("DB connected");
    })
    .catch((err)=>{
        console.log("Cannot connect to DB");
        process.exit();
    })

    export default db;
