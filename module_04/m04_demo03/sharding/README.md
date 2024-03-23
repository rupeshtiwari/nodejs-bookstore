### Prerequisite

Make sure mongodb is running 

```bash
brew services start mongodb-community
```

### Step 1: Run load test without sharding steps

```bash
# 1. navigate to sharding/order-service and run server.js
npm install
node ./server.js

# 2. run load test
artillery run load_test.yaml

```

### Step 2: Run load test with sharding steps

```bash
# 1. navigate to sharding/order-service and run setup_mongo_sharding.sh

./setup_mongo_sharding.sh


# 2. Ensure mongos is Running 
mongos --configdb configReplSet/localhost:27019 --bind_ip localhost --port 27017 --logpath ~/mongodb/mongos.log

# 3. Connect to mongos from another terminal
mongosh "mongodb://localhost:27017/?appName=mongosh+2.2.0"

# 4. Add shards
sh.addShard("shard1ReplSet/localhost:27018");
sh.addShard("shard2ReplSet/localhost:27020");

# 5. Enable sharding
sh.enableSharding("bookstore");

# 6. run server
node ./server.js

# 7. run load test
artillery run load_test.yaml
```









---

To undo sharding in MongoDB and revert to a state without sharding, you would generally need to go through the following steps:

to kill all mongos instances run

```bash
pkill mongos
```

1. **Disable Sharding for Collections:**
   Connect to the `mongos` instance using `mongosh` and remove sharding from the collections using the `sh.shardCollection()` command with the `enableSharding` set to `false`.

   ```bash
   mongosh "mongodb://localhost:27017"
   ```

   ```javascript
   sh.disableSharding("databaseName.collectionName")
   ```

   Replace `databaseName.collectionName` with the name of your database and collection.

2. **Remove Shards from the Cluster:**
   Still within the `mongos` interface, remove the shards using the `sh.removeShard()` command.

   ```javascript
   sh.removeShard("shard1ReplSet")
   sh.removeShard("shard2ReplSet")
   ```

3. **Stop the `mongos` and Shard Instances:**
   After disabling sharding and removing shards, you can stop the `mongos` process and the MongoDB instances acting as shards.

   You can typically stop the `mongos` process and mongod instances using the `kill` command followed by the PID or by using the `db.shutdownServer()` command within `mongosh` if you have administrative privileges.

4. **Drop Databases or Collections (Optional):**
   If you want to completely remove all data that was part of the sharded cluster, you may also drop the databases or collections.

5. **Reset Configuration:**
   You may need to clear out the configuration data used by the sharded cluster. This could include deleting the data files in your `configdb` and the shards.

6. **Restart MongoDB as a Standalone Instance:**
   Start a single `mongod` instance without any sharding configuration.

Keep in mind that this process can involve significant changes to your data and configuration. You should always back up your data before proceeding and ensure that you're not impacting any production systems.
