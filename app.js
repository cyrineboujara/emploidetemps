const express = require('express');
const exphbs = require('express-handlebars'); 
const bodyParser = require('body-parser');  
const mysql = require('mysql'); 

require('dotenv').config();
const app =express();
const port = process.env.PORT || 8888;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('hbs', exphbs.engine({ extname: '.hbs' })); 
app.set('view engine', 'hbs');








const routes= require('./server/routes/user');
app.use('/',routes);


const about= require('./server/routes/user');
app.use('/about',routes);

const contact= require('./server/routes/user');
app.use('/contact',routes);

const login= require('./server/routes/user');
app.use('/login',routes);
const directiondepartement= require('./server/routes/user');
app.use('/directiondepartement',directiondepartement);

const AbsenceList= require('./server/routes/user');
app.use('/AbsenceList',AbsenceList);
const registerTeachers= require('./server/routes/user');
app.use('/registerTeachers',registerTeachers);
const registerStudents= require('./server/routes/user');
app.use('/registerStudents',registerStudents);
app.listen(port, () => console.log(`Listening on port ${port}`));
