const dbs = [require('./dbShard1'), require('./dbShard2')];

const getShardForUser = (userId) => {
  // Simple sharding logic based on user ID
  const shardIndex = userId % dbs.length;
  return dbs[shardIndex];
};

module.exports = {
  getShardForUser,
};
