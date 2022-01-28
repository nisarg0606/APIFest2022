const expreess=require('express');
const app=expreess();
const mongooose=require('mongoose');
const apiRoutes=require('./api-routes');
var cors = require('cors')


app.use(expreess.json());
app.use(expreess.urlencoded({extended:true}));
app.use(cors())
mongooose.connect('mongodb+srv://Netflix:kZi1NfYxeE7byq3Y@cluster0.4alrn.mongodb.net/Cluster0?retryWrites=true&w=majority',
{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('connected to database')).catch(err=>console.log(err));

app.use('/api',apiRoutes);
app.listen(3000,()=>{
    console.log('server is running on port 3000');
});