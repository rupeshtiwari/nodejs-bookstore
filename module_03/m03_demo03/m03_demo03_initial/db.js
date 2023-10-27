const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'bookstorehub',
});

client.connect();

const saveUser = (user) => {
  const query = 'INSERT INTO users(id, name, email) VALUES($1, $2, $3)';
  const values = [user.id, user.name, user.email];
  client.query(query, values, (err) => {
    if (err) {
      console.error('Error saving user:', err);
    }
  });
};

module.exports = {
  saveUser,
};
