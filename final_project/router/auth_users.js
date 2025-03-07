const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  return users.findIndex(x=>x.username == username) != -1;
}

const authenticatedUser = async (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  return await users.findIndex(x=>x.username == username && x.password == password) != -1;
}

//only registered users can login
regd_users.post("/login", async (req,res) => {
  //Write your code here
  try{
    const user = req.body.username;
    const pass = req.body.password;
    if(!user || !pass){
      res.status(400).json({message:"no username or password"});
    }
    else{
      await authenticatedUser(user,pass);
      let token =jwt.sign({data:user}, "secretOrPrivateKey",{expiresIn:60*60*2});
      req.session.authorization = {token};
      res.status(200).json({message:"logged in successfully :)"});
    }
  }
  catch(ex){
    return res.status(500).json({message: "internal server error"});
  }  
});

// Add and modify book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  //Write your code here
  try{

    let matchingBook = books[req.params.isbn];
  
    if(matchingBook){
       matchingBook.reviews[req.user.data]=req.body.review;
       return res.status(200).json(matchingBook.reviews);
     }
     else res.status(500).json({message:"no books found"});
  }
  catch(ex){
    return res.status(500).json({message: "internal server error"});
  }
});

// delete book review
regd_users.delete("/auth/review/:isbn", async (req, res) => {
  try{

    let matchingBook = books[req.params.isbn];
  
    if(matchingBook){
       delete matchingBook.reviews[req.user.data];
       return res.status(200).json({message:"review removed"});
     }
     else res.status(500).json({message:"no books found"});
  }
  catch(ex){
    return res.status(500).json({message: "internal server error"});
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
