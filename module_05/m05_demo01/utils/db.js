// In-memory database
const users = [];

module.exports = {
  addUser: (user) => {
    users.push(user);
  },
  getUser: (username) => {
    return users.find((u) => u.username === username);
  },
};
