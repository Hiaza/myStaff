const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const user_c = require('./models/user');
const test_c = require('./models/test');
const question_c = require('./models/question');
const fs = require('fs-promise');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
const mustache = require('mustache-express');
const viewsDir = path.join(__dirname, 'views');
const usersRouter = require('./routes/users');
const apisRouter = require('./routes/apis');
const testRouter = require('./routes/tests');
const passingRouter = require('./routes/passing');
const questRouter = require('./routes/questions');
const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const developerRouter = require('./routes/developer');
const config = require('./config');
const cloudinary = require('cloudinary');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const Telegram = require('./modules/telegram');


const app = express();
app.engine("mst", mustache(path.join(viewsDir, "partials")));

app.set('views', viewsDir);
app.set('view engine', 'mst');

app.use(express.static(path.join(__dirname, './public')));

app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboyBodyParser({ limit: '5mb' }));
app.use(cookieParser());
app.use(session({
	secret: "Some_secret^string",
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

const errorHandler = require('express-error-handler'),
handler = errorHandler({
  static: {
    '404': "404.html",
    '403': "403.html",
    '500': "500.html"
  }
});

function checkAuth(req, res, next) {
    if (!req.user) return res.redirect('/auth/login') 
    next();  
}
function checkAdmin(req, res, next) {
    if (!req.user) res.render("401").status(401); 
    else if (req.user.role !== 1) res.render("403").status(403); 
    else next(); 
}

function ifAdmin(req) {
    if (!req.user) return; 
    else if (req.user.role !== 1) return;
    else return 1;  
}

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    user_c.getById(id)
        .then((user)=>{
            done(null, user)})
        .catch((err)=>done(err,null))
});

passport.use(new LocalStrategy((username, password, done) => {
        user_c.getByLogAndPass(username,password)
            .then((user)=>done(null, user))
            .catch((err)=>done(null,false)) 
}));

passport.use(new BasicStrategy((userid, password, done)=>{
        user_c.getByLogAndPass(userid,password)
        .then((user)=>done(null, user))
        .catch((err)=>done(null,false))
}));

passport.use(new GoogleStrategy({
   clientID:     config.google_clientID,
   clientSecret: config.google_clientSecret,
   callbackURL: "/auth/google/redirect",
   passReqToCallback   : true
 },
 function(request, accessToken, refreshToken, profile, done) {
    console.log(profile); 
    console.log(profile._json.email);
   user_c.findOrCreate(profile.email)
        .then((user)=>{
            if(user.isDisabled){
                done(null,false);
            }else{
                done(null,user);
            }
        })
        .catch((err)=>{
            console.log(err);
            done(null,false)})
 }
));

app.use('/users',checkAuth,usersRouter);
app.use('/api',apisRouter);
app.use('/tests',checkAuth,testRouter);
app.use('/passing',checkAuth,passingRouter);
app.use('/questions',checkAuth,questRouter);
app.use('/auth',authRouter);
app.use('/auth',authRouter);
app.use('/developer/v1',developerRouter);
app.use('/',homeRouter);

app.post('/delete_Question/:id',checkAuth, async function(req, res) {
   
    const id = req.params.id;
    let question = await question_c.getById(id);
    if(req.user._id.toString()!=question.authorId.toString()&& req.user.role!=1){
        res.status(403).render("403");
        return;
    } 
    question_c.delete(id)
              .then(()=>{
                res.redirect("../questions");
              })
              .catch((err)=>res.status(404).render("404")) 

});

app.post('/update_Question/:id',checkAuth, async function(req, res) {
    
    const id = req.params.id;
    let question = await question_c.getById(id);
    if(req.user._id.toString()!=question.authorId.toString()&& req.user.role!=1){
        res.status(403).render("403");
        return;
    } 
    question_c.getById(id)
              .then((choosed_question)=>{
                const questionData = {

                        "id":           choosed_question.id,
                        "question":     choosed_question.question,
                        "points":       choosed_question.points,
                        "trueAnswer":   choosed_question.trueAnswer,
                        "fakeAnswer1":  choosed_question.fakeAnswer1,
                        "fakeAnswer2":  choosed_question.fakeAnswer2,
                        "fakeAnswer3":  choosed_question.fakeAnswer3,
                        "fakeAnswer4":  choosed_question.fakeAnswer4,
                        "user": req.user,
                        "admin": ifAdmin(req) 
                    };    
    
                    res.setHeader('Content-Type', 'text/html');
                    res.render('question_editing', questionData);
              })
              .catch((err)=>res.status(404).render("404")) 

});

app.post('/update_Test/:id',checkAuth,async function(req, res) {
    
    const id = req.params.id;
    let test = await test_c.getById(id);
    if(req.user._id.toString()!=test.authorID.toString() && req.user.role!=1){
        res.status(403).render("403");
        return;
    } 
    test_c.getById(id)
              .then((choosed_test)=>{
                const testData = {
                    "id":           choosed_test.id,
                    "name":         choosed_test.name,
                    "rating":       choosed_test.rating,
                    "subject":      choosed_test.subject,
                    "user": req.user,
                    "admin": ifAdmin(req)     
                };    
                res.setHeader('Content-Type', 'text/html');
                res.render('test_editing', testData);
              })
              .catch((err)=>res.status(404).render("404")) 
});


app.post('/files',checkAuth,async function (req, res) {
 
    const fileObject = req.files.test_pic;
    const fileBuffer = fileObject.data;
    cloudinary.v2.uploader.upload_stream({ resource_type: 'raw' },
        function (error, result) { 
            if(error) res.status(505).send(error.message);
            else{
                test_c.getById(req.body.id)
                .then((test)=>{
                                test.picUrl = result.url;
                                return Promise.all([test,test.save()]); 
                          })
                .then(([test,])=>{res.redirect("../tests/"+test.id);})
        
                .catch(err => res.status(404).send(err.message))
            }}) .end(fileBuffer)
});


app.post('/delete_Test/:id',checkAuth, async function(req, res) {
     
    const id = req.params.id;
    let test = await test_c.getById(id);
    if(req.user._id.toString()!=test.authorID.toString() && req.user.role!=1){
        res.status(403).render(403);
        return;
    } 
    test_c.delete(id)
              .then(()=>{
                res.redirect("../tests");
              })
              .catch((err)=>res.status(404).send(err.message))  
 });


 app.use( errorHandler.httpError(404) );
 app.use( errorHandler.httpError(500) );
 app.use( errorHandler.httpError(403) );
 
 
 app.use( handler ); 

module.exports = app;
