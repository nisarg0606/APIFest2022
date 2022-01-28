const Movie=require('../models/Movies');
const monogoose=require('mongoose');

exports.getMovies=function(req,res){
    Movie.find({},function(err,movies){
        if(err){
            res.send(err);
        }
        res.json(movies);
    });
}
exports.getMovie=function(req,res){
    Movie.findById(req.params.id,function(err,movie){
        if(err){
            res.send(err);
        }
        res.json(movie);
    });
}
exports.addMovie=function(req,res){
    Movie.create(req.body,function(err,movie){
        if(err){
            res.send(err);
        }
        res.json(movie);
    });
}
exports.updateMovie=function(req,res){
    Movie.findByIdAndUpdate(req.params.id,req.body,function(err,movie){
        if(err){
            res.send(err);
        }
        res.json(movie);
    });
}   //update movie  
exports.deleteMovie=function(req,res){
    Movie.findByIdAndRemove(req.params.id,function(err,movie){
        if(err){
            res.send(err);
        }
        res.json(movie);
    });
}   //delete movie
//get random
exports.getRandom=function(req,res){
    Movie.aggregate([{$sample:{size:1}}],function(err,movie){
        if(err){
            res.send(err);
        }
        res.json(movie);
    });
}
