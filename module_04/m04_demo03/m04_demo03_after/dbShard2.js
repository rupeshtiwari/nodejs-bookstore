const usersShard2 = [];

const saveUser = (user) => {
  usersShard2.push(user);
};

const fetchUser = (userId) => {
  return usersShard2.find((user) => user.id === userId);
};

module.exports = {
  saveUser,
  fetchUser,
};
