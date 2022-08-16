const mongooes = require('mongoose');

const schema = mongooes.Schema;

const userSchema = new schema({
    email:{
        type:String,
        required:true,
        unique:false
    },
    password:{
        type:String,
        required:true,
        unique:false
    }
});




module.exports =  mongooes.model("user",userSchema,"users");