const mongoose=require('mongoose');
const list=require('../models/List');

exports.getLists=function(req,res){
    list.find({},function(err,lists){
        if(err){
            res.send(err);
        }
        res.json(lists);
    });
}

//create
exports.addList=function(req,res){
    list.create(req.body,function(err,list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
}

//delete
exports.deleteList=function(req,res){
    list.findByIdAndRemove(req.params.id,function(err,list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
}