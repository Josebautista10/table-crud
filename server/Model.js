
const { pool } = require('./db');

const getAllDtpoeData = async () => {
  try {
    const result = await pool.query('SELECT * FROM dtpoe');
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching data from dtpoe table');
  }
};

const updateDtpoeData = async (iddpo, nobj, nocon, idarea) => {
  try {
    const result = await pool.query(
      'UPDATE dtpoe SET nobj = $1, nocon = $2, idarea = $3 WHERE iddpo = $4 RETURNING *',
      [nobj, nocon, idarea, iddpo]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error updating data in dtpoe table');
  }
};

const deleteDtpoeData = async (id) => {
  try {
    const result = await pool.query(
      'DELETE FROM dtpoe WHERE iddpo = $1 RETURNING *',
      [id]
    );
    return result.rowCount > 0;
  } catch (error) {
    throw new Error('Error deleting data from dtpoe table');
  }
};

const createDtpoeData = async (nobj, nocon, idarea) => {
  try {
    const result = await pool.query(
      'INSERT INTO dtpoe (nobj, nocon, idarea) VALUES ($1, $2, $3) RETURNING *',
      [nobj, nocon, idarea]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Error creating data in dtpoe table');
  }
};

module.exports = {
  getAllDtpoeData,
  updateDtpoeData,
  deleteDtpoeData,
  createDtpoeData
};
