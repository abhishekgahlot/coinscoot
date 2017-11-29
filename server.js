const app = require('./app.js');
const config = require('./config.js');

app.listen(config.port, () => {
	console.log(`Listening on ${config.port}`);
});