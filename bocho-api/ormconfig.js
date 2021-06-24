//mysql://:@/?reconnect=true

module.exports={
   "type": "mysql",
   "host": "us-cdbr-east-03.cleardb.com",
   "port": 3306,
   "username": "b7146e3523096a",
   "password": "e6432e3b",
   "database": "heroku_110e4ea57743945",
   "synchronize": true,
   "logging": false,
   "entities": [
      "dist/entity/**/*.js"
   ],
   "migrations": [
      "dist/migration/**/*.js"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}