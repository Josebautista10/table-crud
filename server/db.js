const { Pool } = require('pg');

// Create a new pool instance for managing connections
const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // or your database host
  database: 'capital',
  port: 5432 // default PostgreSQL port
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  } else {
    console.log('Connected to PostgreSQL database:', res.rows[0].now);
  }
});

module.exports = {
  pool
};