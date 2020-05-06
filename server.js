//Install express server
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

const deploypath = __dirname+'/dbdashboard';
app.use(express.static(deploypath));

app.get('/*', (req,res) => {
res.sendFile(path.join(__dirname+'/dbdashboard/index.html'));
})

app.get('/ping', (req, res) => res.send('Hello World!'))

// app.listen(port || 8080, ()=> console.log('Example app listening at http://localhost:${port}'));
 app.listen(port|| 8080, () => console.log(`Example app listening at http://localhost:${port}`))
