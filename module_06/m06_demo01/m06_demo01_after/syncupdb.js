const { rewards: rewardsServiceDb } = require('./rewardsServiceDb');
const { rewards: monolithRewardsDb } = require('./db');

// Function to sync data from rewardsServiceDb to monolithRewardsDb
function syncToMonolith() {
  Object.keys(rewardsServiceDb).forEach((key) => {
    monolithRewardsDb[key] = rewardsServiceDb[key];
  });
}

// Function to sync data from monolithRewardsDb to rewardsServiceDb
function syncToMicroservice() {
  Object.keys(monolithRewardsDb).forEach((key) => {
    rewardsServiceDb[key] = monolithRewardsDb[key];
  });
}

// Function to run bidirectional synchronization
function runBidirectionalSync() {
  syncToMonolith();
  syncToMicroservice();
}

// Run bidirectional synchronization every 500ms
setInterval(runBidirectionalSync, 500);
