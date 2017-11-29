const app = require('./app.js');
const db = require('./server/db/interface');
const config = require('./config.js');

db.connectMongo().then(() => {
  app.listen(config.port, () => {
    log(`Listening on ${config.port}`);
  });
}).catch((e) => {
	log(e);
});