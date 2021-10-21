const express = require('express');
const axios = require('axios');
const { rejects } = require('assert');
const app = express();

const baseUrl = 'https://api.github.com/users/';

app.use(express.json());

app.post('/api/dev-details', async function(req, res, next) {
	let promises = [];

	req.body.developers.map((dev) => {
		promises.push(
			axios.get(`${baseUrl}${dev}`).catch((err) => {
				console.log(`Couldnt find ${dev}`);
				return err;
			})
		);
	});

	const data = await Promise.all(promises);
	const output = data.map((resp) => {
    try {
    ({ name: resp.data.name, bio: resp.data.bio })
    } catch (err) {
      ({message: 'no data'})
    }
  });
	return res.json(output);
});

app.listen(3000, () => {
	console.log('server started on port 3000');
});
