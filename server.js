const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require('multer');
const nodemailer = require('nodemailer');
import userController from
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.set('view engine', 'ejs');

const upload = multer({ dest: 'uploads/' });

const userModel = require('./models/user');
const jobModel = require('./models/job');

const userController = require('./controllers/user');
const jobController = require('./controllers/job');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', userController.register);

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', userController.login);

app.get('/logout', userController.logout);

app.get('/jobs', jobController.getAllJobs);

app.get('/jobs/new', (req, res) => {
  res.render('new-job');
});

app.post('/jobs/new', upload.single('resume'), jobController.createJob);

app.get('/jobs/:id', jobController.getJob);

app.get('/jobs/:id/apply', jobController.applyToJob);

app.get('/jobs/:id/applicants', jobController.getJobApplicants);

app.post('/jobs/:id/delete', jobController.deleteJob);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});