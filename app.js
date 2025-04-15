const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes/benefits');
const path = require('path');
const app = express();
const port = 3000;
app.use(bodyparser.json());
app.use(routes);
app.use(express.static(path.join(__dirname,'public')));

app.listen(port,() => {
    console.log(`server listening to ${port}`);
    console.log(`http://localhost:${port}`);
});
