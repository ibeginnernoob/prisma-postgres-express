import express from 'express';
import bodyParser from 'body-parser';

import Routes from './routes/index';

const app=express();

app.use(bodyParser.json());

app.use(Routes);

app.listen(3000,()=>{
    console.log("Listening on port 3000!");
});