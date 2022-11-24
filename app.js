const express=require('express')
const app=express()
const cors=require('cors')
const joi=require('joi')
const config=require('./config.js')
app.use(cors())
app.use(express.urlencoded({extended:false}))
const expressJwt=require('express-jwt')
app.use(expressJwt({ secret: config.secretkey }).unless({path:[/^\/api\//]}))
const User=require('./router/user')
app.use('/api',User)

app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError) return res.send({status:1,message:err.message})
    res.send({ status: 1, message: "失败" })
    if(err.name==='UnauthorizedError') return res.send('ok')
})

app.listen(3007,()=>{
    console.log('run ok');
})