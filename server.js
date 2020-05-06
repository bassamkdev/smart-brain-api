const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');
const auth = require('./controllers/authorization')
const signout = require('./controllers/signout')

if (process.env.NODE_ENV === 'production') {
  var db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }  
  });
} else {
  var db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI 
  })
}

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=> {res.send('It is working')})

app.post('/signin', (req, res)=> {signin.signinAuthentication(req,res,bcrypt,db)});

app.post('/register', (req,res)=>{register.handleRegister(req, res, bcrypt, db)});

app.post('/signout', (req, res) => { signout.handleSignout(req, res)});

app.get('/profile/:id', auth.requireAuth, (req, res) =>{profile.handleProfileGet(req, res, db)});

app.post('/profile/:id', auth.requireAuth, (req,res) => { profile.handleProfileUpdate(req, res, db)})

app.put('/image', auth.requireAuth, (req,res) => {image.handleImage(req, res, db)});

app.post('/imageurl', auth.requireAuth, (req,res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`app is running on port ${process.env.PORT || 3000}`);
})

