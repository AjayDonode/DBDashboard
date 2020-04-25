//Install express server
const express = require('express');
const path = require('path');
const app = express();

console.log("Service Application"+process.env.PORT);
app.use(express.static(__dirname+'/dist/dbdashboard'));

app.get('/*', function(req,res){
  console.log("Service Application"+process.env.PORT);
res.sendFile(path.join(__dirname+'/dist/dbdashboard/index.html'));
app.listen(process.env.PORT || 8080, ()=> console.log('Example app listening at http://localhost:${port}'));

})
