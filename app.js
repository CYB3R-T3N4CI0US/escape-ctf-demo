const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// const supabase = createClient('https://wnqgtdjwtljjzjgjctdf.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InducWd0ZGp3dGxqanpqZ2pjdGRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgyMDM1MDIsImV4cCI6MTk5Mzc3OTUwMn0.aQ61vCTe3xbSM34N7v2nj_GLj0FGxvVT2xUSigLdqu0')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Register 
/*
const signupHandler = async (e: FormEvent) => {
  e.preventDefault();
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) console.error(error);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
