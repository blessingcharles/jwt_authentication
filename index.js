const express = require('express');
const router = require('./routes/auth');
const mongoose = require('mongoose');
const post_route = require('./routes/posts')

mongoose.connect('mongodb+srv://<user>:<password>@cluster0.6bmhe.mongodb.net/JWT?retryWrites=true&w=majority',
{ useNewUrlParser: true } ,()=>{console.log('connected to db');});

const app = express();

app.use(express.json());

app.use('/api/user',router);
app.use('/api/posts',post_route);


app.listen(3000);