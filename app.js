require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const novedadesRouter = require('./routes/admin/novedades');
const app = express();
const port = 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
 secret: 'claveSecretaM6U2_2026',
 resave: false,
 saveUninitialized: true
}));
const secured = async (req, res, next) => {
 try {
 if (req.session.id_usuario) {
 next();
 } else {
 next();
 }
 } catch (error) {
 console.error(error);
 }
};
app.use('/admin/novedades', secured, novedadesRouter);
app.get('/', (req, res) => {
 res.redirect('/admin/novedades');
});
app.listen(port, () => {
 console.log(`Servidor M6U2 corriendo en http://localhost:${port}`);
});
