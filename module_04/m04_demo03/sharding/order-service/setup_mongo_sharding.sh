#!/bin/bash

# Define directories for MongoDB data
CONFIGDB_DIR="$HOME/mongodb/data/configdb"
SHARD1_DIR="$HOME/mongodb/data/shard1"
SHARD2_DIR="$HOME/mongodb/data/shard2"

# Create the directories
mkdir -p $CONFIGDB_DIR
mkdir -p $SHARD1_DIR
mkdir -p $SHARD2_DIR

# Start Config Server
mongod --configsvr --replSet configReplSet --dbpath $CONFIGDB_DIR --port 27019 --bind_ip localhost --logpath $CONFIGDB_DIR/log.configsrv.log

# Wait for the config server to initiate
sleep 5

echo "Initiating config server replica set..."
mongosh --port 27019 --eval 'rs.initiate({_id: "configReplSet", configsvr: true, members: [{ _id: 0, host: "localhost:27019" }]})'

# Start Shard 1 Server
mongod --shardsvr --replSet shard1ReplSet --dbpath $SHARD1_DIR --port 27018 --bind_ip localhost --logpath $SHARD1_DIR/log.shard1srv.log

# Start Shard 2 Server
mongod --shardsvr --replSet shard2ReplSet --dbpath $SHARD2_DIR --port 27020 --bind_ip localhost --logpath $SHARD2_DIR/log.shard2srv.log

# Wait for shard servers to start
sleep 5

echo "Initiating shard1 replica set..."
mongosh --port 27018 --eval 'rs.initiate({_id: "shard1ReplSet", members: [{ _id: 0, host: "localhost:27018" }]})'

echo "Initiating shard2 replica set..."
mongosh --port 27020 --eval 'rs.initiate({_id: "shard2ReplSet", members: [{ _id: 0, host: "localhost:27020" }]})'

echo "Please start mongos manually with the following command:"
echo "mongos --configdb configReplSet/localhost:27019 --bind_ip localhost --port 27017 --logpath ~/mongodb/mongos.log"
