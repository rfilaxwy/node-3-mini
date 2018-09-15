require('dotenv').config();

const express = require('express'),
    bodyParser = require('body-parser'),
    app = express()
    messageCtrl = require('./messageCtrl.js'),
    session = require('express-session');

let {SERVER_PORT, SESSION_SECRET} =process.env;

app.use(bodyParser.json());
app.use(session({
    secret:SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));

app.use((req,res,next)=>{
    let badwords =['jerk', 'fuck','internet explorer'];
    if(req.body.message){
        let badWordsExist =true;
        for(let i = 0; i<badWords.length;i++){
            let regex = new RegExp(badWords[i],'g');
            req.body.message=req.body,message.replace(regex, '****');
        }
        next();
    }else {
        next();
    }
})
app.get('/api/messages', messageCtrl.getAllMessages)
app.post('/api/messages',messageCtrl.createMessage)

app.get('/api/messages/history', messageCtrl.history)

app.listen(SERVER_PORT, ()=> {
    console.log(`Listening on port ${SERVER_PORT}`);
});