const express=require('express')

const app=express()
const cors=require('cors')
const nodemailer=require('nodemailer')
require('dotenv/config')
var transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'nodeforme@gmail.com',
        pass:process.env.PASSWORD

    },
    port:465
})


app.use(cors())
const bodyParser=require('body-parser')
app.use(bodyParser.json())


const port=process.env.PORT || 3000


app.get('/',(req,res)=>{
    res.send('<h1>Noice</h1>')
})

app.post('/sendmail',async(req,res)=>{
    const message=req.body.message
    
    transporter.sendMail({
        from:'nodeforme@gmail.com',
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

app.listen(port,()=>console.log("Server is listening"))


