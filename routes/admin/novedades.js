const express = require('express');
const router = express.Router();
const novedadesModel = require('../../models/novedadesModel');
// GET: Listar novedades
router.get('/', async (req, res) => {
 try {
 const novedades = await novedadesModel.getNovedades();
 res.render('admin/novedades', { novedades });
 } catch (error) {
 console.error(error);
 res.status(500).send('Error al cargar las novedades');
 }
});
// GET: Mostrar formulario de agregar
router.get('/agregar', (req, res) => {
 res.render('admin/agregar');
});
// POST: Procesar alta
router.post('/agregar', async (req, res) => {
 try {
 if (req.body.titulo !== "" && req.body.subtitulo !== "" && req.body.cuerpo !== "") {
 await novedadesModel.insertNovedad(req.body);
 res.redirect('/admin/novedades');
 } else {
 res.render('admin/agregar', {
 error: true,
 message: 'Todos los campos son requeridos'
 });
 }
 } catch (error) {
 console.error(error);
 res.render('admin/agregar', {
 error: true,
 message: 'No se pudo cargar la novedad'
 });
 }
});
// GET: Eliminar novedad por ID
router.get('/eliminar/:id', async (req, res) => {
 try {
 const id = req.params.id;
 await novedadesModel.deleteNovedadById(id);
 res.redirect('/admin/novedades');
 } catch (error) {
 console.error(error);
 res.status(500).send('Error al eliminar la novedad');
 }
});
// GET: Mostrar formulario de modificar cargado con los datos de la novedad
router.get('/modificar/:id', async (req, res) => {
 try {
 const id = req.params.id;
 const novedad = await novedadesModel.getNovedadById(id);
 res.render('admin/modificar', { novedad });
 } catch (error) {
 console.error(error);
 res.status(500).send('Error al obtener la novedad');
 }
});
// POST: Procesar actualización de novedad
router.post('/modificar', async (req, res) => {
 try {
 const obj = {
 titulo: req.body.titulo,
 subtitulo: req.body.subtitulo,
 cuerpo: req.body.cuerpo
 };
 await novedadesModel.modificarNovedadById(obj, req.body.id);
 res.redirect('/admin/novedades');
 } catch (error) {
 console.error(error);
 res.render('admin/modificar', {
 error: true,
 message: 'No se modificó la novedad'
 });
 }
});
module.exports = router;
