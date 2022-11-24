const joi=require('joi')
username=joi.string().alphanum().min(3).max(10).required()
password=joi.string().alphanum().min(6).max(12).required()
exports.schema_login={
    body:{
        username,
        password
    }
}