const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", async (req,res) => {
  //Write your code here
  try{
    const user = req.body.username;
    const pass = req.body.password;
    if(!user || !pass){
      res.status(400).json({message:"no username or password"});
    }
    else{
      users.push({user,pass});
      //console.log(users);
      res.status(200).json({message:"registered successfully :)"});
    }
  }
  catch(ex){
    return res.status(500).json({message: "internal server error"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  try{
    let allbooks = books;
    if(allbooks){
      return res.status(200).json(allbooks);
    }
    else res.status(500).json({message:"no books found"});
  }
  catch(ex){
    return res.status(500).json({message: "internal server error"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  try{
    let matchingBook =books[req.params.isbn];
    if(matchingBook){
      return res.status(200).json(matchingBook);
    }
    else res.status(500).json({message:"no book with this ISBN found"});
  }
  catch(ex){
    return res.status(500).json({message: "internal server error"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  try{
    let matchingBooks = (Object.values(books)).filter(x=>x.author == req.params.author);
    if(matchingBooks.length>0){
      return res.status(200).json(matchingBooks);
    }
    else res.status(500).json({message:"no books found"});
  }
  catch(ex){
    console.log(ex);
    return res.status(500).json({message: "internal server error"});
  }
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  try{
    let matchingBooks = await Object.values(books).filter(x=>x.title == req.params.title);
    if(matchingBooks.length>0){
      return res.status(200).json(matchingBooks);
    }
    else res.status(500).json({message:"no books found"});
  }
  catch(ex){
    return res.status(500).json({message: "internal server error"});
  }
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
  try{
    let matchingBook =books[req.params.isbn];
    if(matchingBook){
      return res.status(200).json(matchingBook.reviews);
    }
    else res.status(500).json({message:"no books found"});
  }
  catch(ex){
    return res.status(500).json({message: "internal server error"});
  }
});

module.exports.general = public_users;
