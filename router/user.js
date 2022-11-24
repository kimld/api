const express = require('express')
const app=express()
const router=express.Router()
const user=require('../router_handle/user')
const { schema_login }=require('../schema/user')
const expressJoi=require('@escook/express-joi')
router.post('/reguser',expressJoi(schema_login),user.reguser)

router.post('/login', expressJoi(schema_login),user.login)

module.exports=router