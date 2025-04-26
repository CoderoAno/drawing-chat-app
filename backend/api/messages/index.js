const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_CONNECTION_STRING
});

module.exports = async function (context, req) {
  if (req.method === 'GET') {
    const res = await pool.query('SELECT * FROM messages');
    return { body: res.rows };
  }

  if (req.method === 'POST') {
    await pool.query(
      'INSERT INTO messages(nick, text) VALUES($1, $2)',
      [req.body.nick, req.body.text]
    );
    return { status: 201 };
  }
};
