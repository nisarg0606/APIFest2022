const mongoose=require('mongoose');
const User=require('../models/User');
var cryptoJs=require('crypto-js');
const jwt = require("jsonwebtoken");
const verify=require('../verfiyToken');

exports.register=function (req,res){
     
    let u=new User({

        name:req.body.name,
        email:req.body.email,
        password:cryptoJs.AES.encrypt(req.body.password,"lama").toString(),
        
    })
    u.save(function(err,data){
        if(err){
            res.json({
                status: 500,
                data: err,
                msg: "Something went wrong"
            })
        }
        else{
            res.json({
                status: 200,
                data: data,
                msg: "user save successfully"
            })
        }
    })
}
exports.login=function(req,res){
    User.findOne({email:req.body.email},function(err,data){
       if(err){
           res.json({
               status:500,
               data:err,
               msg:"Something went wrong"
           })
       }
       else{
        const bytes=cryptoJs.AES.decrypt(data.password,"lama");
        const plaintext=bytes.toString(cryptoJs.enc.Utf8);

        if(plaintext==req.body.password){
       
            if(data.length==0){
            res.json({
                status: 404,
                data: data,
                msg: "user not found"
            })
            }else{
                const accessToken = jwt.sign(
                    { id: data._id, isAdmin: data.isAdmin },
                    "lama",
                    { expiresIn: "5d" }
                  );
              
                  const { password, ...info } = data._doc;
                res.json({
                    status: 200,
                    data: {...info, accessToken},
                    //accessToken: accessToken,
                    msg: "user found"
                })
                
            }
            
        
    }else{
        res.json({
            status: 401,
            data: err,
            msg: "password is wrong"
        })
    }
}
    })
}

exports.getUsers=function(req,res){
    User.find({},function(err,data){
        if(err){
            res.json({
                status:500,
                data:err,
                msg:"Something went wrong"
            })
        }
        else{
            res.json({
                status:200,
                data:data,
                msg:"user found"
            })
        }
    })


}
exports.getUser=function(req,res){

    User.findById(req.params.id,function(err,data){
        if(err){
            res.json({
                status:500,
                data:err,
                msg:"Something went wrong"
            })
        }
        else{
            res.json({
                status:200,
                data:data,
                msg:"user found"
            })
        }
    })
}
exports.updateUser=function(req,res){   //update user
    if (req.body.password) {
        req.body.password =cryptoJs.AES.encrypt(req.body.password,"lama").toString();
    User.findByIdAndUpdate(req.params.id,req.body,function(err,data){
        if(err){
            res.json({
                status:500,
                data:err,
                msg:"Something went wrong"
            })
        }
        else{
            res.json({
                status:200,
                data:data,
                msg:"user update successfully"
            })
        }
    })
}
}
exports.deleteUser=function(req,res){   
    User.findByIdAndDelete(req.params.id,function(err,data){
        if(err){
            res.json({
                status:500,
                data:err,
                msg:"Something went wrong"
            })
        }
        else{
            res.json({
                status:200,
                data:data,
                msg:"user delete successfully"
            })
        }
    })
}
