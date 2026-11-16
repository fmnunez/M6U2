const pool = require('../bd');
// Traer todas las novedades (Read)
async function getNovedades() {
 try {
 const query = 'SELECT * FROM novedades ORDER BY id DESC';
 const rows = await pool.query(query);
 return rows;
 } catch (error) {
 console.error(error);
 throw error;
 }
}
// Insertar una nueva novedad (Create)
async function insertNovedad(body) {
 try {
 const query = 'INSERT INTO novedades SET ?';
 const rows = await pool.query(query, [body]);
 return rows;
 } catch (error) {
 console.error(error);
 throw error;
 }
}
// Eliminar novedad por ID (Delete)
async function deleteNovedadById(id) {
 try {
 const query = 'DELETE FROM novedades WHERE id = ?';
 const rows = await pool.query(query, [id]);
 return rows;
 } catch (error) {
 console.error(error);
 throw error;
 }
}
// Obtener una sola novedad por ID para modificar
async function getNovedadById(id) {
 try {
 const query = 'SELECT * FROM novedades WHERE id = ?';
 const rows = await pool.query(query, [id]);
 return rows;
 } catch (error) {
 console.error(error);
 throw error;
 }
}
// Modificar novedad por ID (Update)
async function modificarNovedadById(obj, id) {
 try {
 const query = 'UPDATE novedades SET ? WHERE id = ?';
 const rows = await pool.query(query, [obj, id]);
 return rows;
 } catch (error) {
 console.error(error);
 throw error;
 }
}
module.exports = {
 getNovedades,
 insertNovedad,
 deleteNovedadById,
 getNovedadById,
 modificarNovedadById
};
