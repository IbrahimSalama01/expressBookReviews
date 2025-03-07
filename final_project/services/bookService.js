
const axios = require('axios');

// get all books
 const getAllBooks = async()=>{
    try{
        let response = await axios.get("http://localhost:5000/");
        console.log(response.data);
    }
    catch(ex)
    {
        console.log("something went wrong",ex.message);
    }
}

// getByISBN
const searchByISBN = async (_isbn)=>{
    try{
        let response = await axios.get(`http://localhost:5000/isbn/${_isbn}`);
        console.log(response.data);
    }
    catch(ex)
    {
        console.log("something went wrong",ex.message);
    }
}

// getByAuthor
const searchByAuthor = async (_author)=>{
    try{
        let response = await axios.get(`http://localhost:5000/author/${_author}`);
        console.log(response.data);
    }
    catch(ex)
    {
        console.log("something went wrong",ex.message);
    }
}

// getByTitle
const searchByTitle = async (_title)=>{
    try{
        console.log(_title);
        let response = await axios.get(`http://localhost:5000/title/${_title}`);
        console.log(response.data);
    }
    catch(ex)
    {
        console.log("something went wrong",ex.message);
    }
}

//Exporting functions as commonjs
module.exports ={
    getAllBooks,
    searchByISBN,
    searchByAuthor,
    searchByTitle
};