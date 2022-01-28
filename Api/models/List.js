const mongooose=require('mongoose');
const Schema=mongooose.Schema;

const ListSchema=new Schema({
    title:{type:String,required:true},
    genre:{type:String},
    type:{type:String},
    content:{type:Array},
},
{timestamps:true}
);

module.exports=mongooose.model("List",ListSchema)