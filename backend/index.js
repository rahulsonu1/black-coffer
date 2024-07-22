const express=require('express')
const app=express()
const dotenv=require('dotenv').config()






const port=process.env.PORT
app.listen(port,function(err){
    if(err){console.log(`Error in running server at PORT:${port}`)}
    console.log(`Server is running at PORT : ${port}`)
})