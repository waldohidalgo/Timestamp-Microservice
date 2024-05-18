import express from 'express';
import path from 'path';

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
import cors from 'cors';
const app = express();




app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(path.resolve('views','index.html'));
});

app.get("/api",(req,res)=>{
  res.json({"unix":Date.now()
    , "utc":(new Date()).toUTCString()});
});

app.get("/api/:date",(req,res)=>{
  const {date}=req.params;
  if(!date){
    res.json({"unix":Date.now()
    , "utc":(new Date()).toUTCString()});
    return;
  }
  
  try {
    let dateObject;
  if(Number.isInteger(+date)){
    dateObject=new Date(+date);
    res.json({"unix":Number(dateObject), "utc":dateObject.toUTCString()});
    return;
  }
  dateObject=new Date(date);
  res.json({"unix":Number(dateObject), "utc":dateObject.toUTCString()});
  } catch (error) {
    res.json({"error":"Invalid Date"})
  }
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
