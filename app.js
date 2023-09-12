const express = require('express');
const path = require('path');
const indexRouter = require('./src/routes/index');
const moviesRoutes = require('./src/routes/moviesRoutes');
const genresRoutes = require('./src/routes/genresRoutes');
const methodOverride = require('method-override');

const app = express();

// view engine setup
app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './src/views'),

]);

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));


app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);

app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));
