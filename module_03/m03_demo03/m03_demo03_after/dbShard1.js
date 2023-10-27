const usersShard1 = [];

const saveUser = (user) => {
  usersShard1.push(user);
};

const fetchUser = (userId) => {
  return usersShard1.find((user) => user.id === userId);
};

module.exports = {
  saveUser,
  fetchUser,
};
