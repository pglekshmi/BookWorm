import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import SignUp from "../Models/Signup.js";
import Book from '../Models/Book.js';
import Counter from '../Models/Counter.js';
import bcrypt from 'bcrypt';
import { authenticate } from './authMiddleware.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const router = Router();
const { secret_key } = process.env;


router.get('/', (req, res) => {
    res.send("Hello World");
})

router.post('/signup', async (req, res) => {
    try {
       
        const data = req.body;
        console.log(data);
        const { FirstName, LastName, UserName, Password, UserRole } = req.body;
        // console.log(Password);
        const newPassword = await bcrypt.hash(Password, 10)
      
        console.log(newPassword);
        const newUser = {
            FirstName,
            LastName,
            UserName,
            Password: newPassword,
            UserRole
        };
        console.log(newUser);
     

        const result = await SignUp.create(newUser);
        console.log(result);
        res.status(201).json({ message: "Saved on DB" })
    }
    catch (error) {
        res.status(500).json();
    }
})

router.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body;
        const user = await SignUp.findOne({ UserName });
        const UserId= (user._id).toString();
        console.log(UserId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        const isvalid = await bcrypt.compare(Password, user.Password);
        if (isvalid) {

            const token = jwt.sign({ UserName: UserName, UserRole: user.UserRole,UserId:UserId }, secret_key, { expiresIn: '1h' })
            console.log(token);

            res.cookie('authToken', token, {
                httpOnly: true
            });
            res.send(token);
        }
        else {
            res.send("Invalid Password");
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
})

router.post('/addBook', authenticate, async (req, res) => {
    console.log(req.user);
    const user = req.user;
    
    const { BookName, Author, ISBN,Category, Copies, Price } = req.body;
    console.log(typeof Price);
    try {
        
        if (user == "admin") {
            // const count = await Counter.findOneAndUpdate(
            //     {Id:"BookId"},
            //     {"$inc":{"Seq":1}},
            //     {new:true,upsert: true }
            // );
            
            // console.log(count.Seq);
            //  const BookId = 'B'+count.Seq;
            const newBook = {
               
                BookName,
                Author,
                ISBN,
                Category,
                Copies,
                Price
            }
            console.log(newBook);
            try {
                const book = await Book.create(newBook);
                res.status(201).json({message:"Book Details Uploaded"});
            }
            catch (error) {
                res.status(400).json({ message: "Check the Book Details" });

            }
         }
         else{
            res.status(400).json({message:"Unauthorized Access"})
         }

    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized Access" });

    }
})

router.patch('/updateBook',authenticate,async(req,res)=>{
    try{
        const user=req.user;
        if(user=='admin'){
  console.log(req.query.id);
  const search =req.query.id; 
  const {Category,Copies,Prize} = req.body;
  const result=await Book.updateOne({ISBN:search},{$set:{Category:Category,
                                            Copies:Copies,
                                           Prize:Prize}});
    res.status(200).json({message:"Data Updated"})}
else{
    res.status(401).json({message:"Unauthorized Access"})
}}
    catch(error){
        res.status(500).json({message:"Internal Server error"})
    }
})



export default router;