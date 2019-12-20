const express = require('express');
const exphbs  = require('express-handlebars');
const passgen = require('./passgen');

const app = express();
app.use(express.urlencoded({extended:false}));

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index');
});

app.post('/', function(req,res) {
    res.render('index',{
        password: passgen(req.body.passwordfor, req.body.seed1, req.body.seed2)
    })
});

//Starts server
var PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));