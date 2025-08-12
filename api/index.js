const express = require('express')
const app = express();
const router = express.Router()
const bodyParser = require('body-parser')
const {GoogleGenerativeAI} = require("@google/generative-ai")
const dotenv = require('dotenv').config()
const ai =  require("@google/genai");

app.use(bodyParser.json())

app.post('/getResponse',(req,res)=>{
    console.log("hii");
    console.log(req.body.question);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({model:"gemini-2.5-flash"});
    model.generateContent(req.body.question).then(result=>{
        console.log(result.response.text());
        const response = result.response.text();
        res.status(200).json({
            response:response
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({
            error:err
        })
    })
})

app.use('/*splat',(req,res)=>{
    res.status(404).json({
        msg:"Bad Request"
    })
})
module.exports = index


