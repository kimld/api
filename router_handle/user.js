const db=require('../db/index')
const bcryptjs=require('bcryptjs')
const  jsonwebtoken=require('jsonwebtoken')
const config=require("../config.js")
exports.reguser=(req,res)=>{
    const userinfo=req.body
    if(!userinfo.username||!userinfo.password){
        return res.send({status:1,message:'用户名或者密码不能为空'})
    }else{
        const sql='select * from login where username=?'
        db.query(sql,userinfo.username,function(err,results){
            if (err) return res.send({ status: 1, message: err.message })
            if(results.length>0){
                return res.send({ status: 1, message: '用户名已经存在' })
            }else{
                userinfo.password=bcryptjs.hashSync(userinfo.password,10)
                const sql='insert into login set ?'
                db.query(sql,{username:userinfo.username,password:userinfo.password},function(err,results){
                    if (err) return res.send({ status: 1, message: err.message })
                    if (results.affectedRows != 1) return res.send({ status: 1, message: '注册失败'})
                    else{
                        res.send('注册成功')
                    }
                })
            }
        })
    }


}
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from login where username=?'
    db.query(sql, userinfo.username, function (err, results) {
        if (err) return res.send({ status: 1, message: err.message })
        if (results.length != 1) return res.send({ status: 1, message: '用户名不存在' })
        else{
            const compare=bcryptjs.compareSync(userinfo.password,results[0].password)
            if(!compare){
                return res.send('登录失败')
            }else{
                const user={...results[0],password:'',user_pic:''}
               const tokenStr=jsonwebtoken.sign(user,config.secretkey,{
                    expiresIn:'10h'
                })
                res.send({
                    status:0,
                    message:'登录成功',
                    token:'Bearer '+tokenStr
                })
            }
        }
    })
}