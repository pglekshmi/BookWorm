import { Router } from "express";
import Book from "../Models/Book.js";
import Cart from "../Models/Cart.js";
import jwt from 'jsonwebtoken';
import { extractToken } from "./authMiddleware.js";
import { authenticate } from "./authMiddleware.js";
import { log } from "debug/src/browser.js";

const router = Router();
router.get('/getBook/:id', async (req, res) => {
  try {
    const search = req.params.id;
    console.log(search);

    const result = await Book.find({
      '$or': [
        { BookId: search },
        { BookName: search },
        { Author: search },
        { ISBN: search }]
    });
    console.log(result);
    res.send(result);
  }
  catch (error) {
    res.status(400).json({ message: "Check the input" })
  }
})

router.post('/addCart', authenticate, async (req, res) => {
  const UserRole = req.user;
  console.log(UserRole, "hi user");

  if (UserRole == 'user') {
    const value = req.headers.cookie;
    // console.log(token);
    const token = extractToken(value, "authToken");
    const User = jwt.decode(token);
    console.log(User);
    const UserId = User.UserId;
    console.log(UserId);
    const { BookName, Quantity } = req.body;
    const book = await Book.findOne({ BookName: BookName });
    console.log(book);

    const BookId = book._id.toString();
    console.log(BookId);
    try {


      const result = await Cart.findOneAndUpdate({ UserId: UserId, 'items.BookId': BookId },
        {
          $set: {

            'items.$.Quantity': Quantity

          }
        },
        {
          upsert: false,
          new: true
        })

      console.log(result);
      // res.status(201).json({message:"Entry Updated"})
      if (!result) {
        console.log("Create Entry");


        const newResult = await Cart.findOneAndUpdate({ UserId: UserId },
          {
            $push: {

              items: {
                BookId: BookId,
                Quantity: Quantity
              }

            }
          },
          {
            upsert: true,
            new: true
          })
      }
      res.status(201).json({ message: "New Entry Added" })


    }

    catch (error) {
      res.status(400).json({ message: "DB cant get updated, check the input" })
    }

  }
  else {
    res.status(400).json({ message: "Unauthorized Access" });
  }


})

router.get('/viewCart',authenticate,async(req,res)=>{
  const value = req.headers.cookie;
  const token = extractToken(value, "authToken");
  
  const User = jwt.decode(token);
  console.log(User);
  const UserId = User.UserId;
  console.log(UserId);
  const cart=await Cart.findOne({UserId:UserId}).populate('items.BookId');
  res.send(cart.items);
})

router.get('/buyCart',authenticate, async(req, res) => {
  const value = req.headers.cookie;
  const token = extractToken(value, "authToken");
  
  const User = jwt.decode(token);
  console.log(User);
  const UserId = User.UserId;
  console.log(UserId);
  const cart=await Cart.findOne({UserId:UserId}).populate('items.BookId');
  console.log(cart.items);
  let total=0;
  let Price,Quantity;
  for(let book of cart.items){
    Price =book.BookId.Price;
    Quantity=book.Quantity;
    total+=(Price*Quantity)
    
    
  }
  console.log(total);
  res.send(total);
  
  
})

export default router;