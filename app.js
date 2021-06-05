const express=require('express')

const app=express()
const cors=require('cors')
const nodemailer=require('nodemailer')
const bodyParser=require('body-parser')

var multer = require('multer');
var upload = multer();
// app.use(upload.array()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv/config')
var transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'devolver.tech@gmail.com',
        pass:process.env.PASSWORD

    },
    port:465
})


app.use(cors())



const port=process.env.PORT || 3000

  

app.get('/',(req,res)=>{
    res.send('<h1>Noice</h1>')
})

app.post('/sendmail',async(req,res)=>{
    // const message=req.body.message
    
    transporter.sendMail({
        from:'devolver.tech@gmail.com',
        to:req.body.recieverEmail,
        subject:'Query',
        text:`  Sender E-mail:${req.body.senderEmail} \n Message: ${req.body.message} \n mobile number  ${req.body.mobile} \n scope:${req.body.scope} \n client:${req.body.client}`
    },(error,info)=>{
        if(error){
            console.log("hii")
            res.status(400).send(error)
        }else{
           res.status(200).send("mail sent")
        }
    })
})
app.post('/sendmailAttachment',upload.array('files',2),async(req,res)=>{
    // const message=req.body.message
    // console.log(req.body)
    console.log(req.files);
    transporter.sendMail({
        from:'nodeforme@gmail.com',
        to:req.body.recieverEmail,
        subject:'Query',
        text:`  Sender E-mail:${req.body.senderEmail} \n Position: ${req.body.position} \n mobile number : ${req.body.mobile} \n name:${req.body.name} \n`,
        attachments:[{  
            filename: "cv.pdf",
            content:req.files[0].buffer
        },{  
            filename: "portfolio.pdf",
            content:req.files[1].buffer
        }]
    },(error,info)=>{
        if(error){
            console.log("hii")
            // console.log(req);
            res.status(400).send(error)
        }else{
           res.status(200).send("mail sent")
        }
    })
})
app.listen(port,()=>console.log("Server is listening"))


