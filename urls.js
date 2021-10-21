const fs = require('fs');
const axios = require('axios');
const file = process.argv[2];

async function readFile(file) {
	const data = fs.readFileSync(file, 'utf8');
	const lines = data.split(/\r?\n/);
	let urls = [];
	for (let line of lines) {
		if (line) {
			urls.push(line);
		}
	}
	getUrls(urls);
}

async function getUrls(urls = []) {
	let promises = [];
	let results = [];
	for (let url of urls) {
		promises.push(
			axios.get(url).catch((err) => {
				console.log(`Couldnt download ${url}`);
			})
		);
	}
	console.log(promises);

	const data = await Promise.all(promises);

	let i = 0;
	data.forEach((url) => {
		try {
			let name = url.config.url
			let start = name.indexOf('://');
			name = name.slice(start+3);
			let end = name.indexOf('/')
			if (end != -1){
				name = name.slice(0,end)
			}
			fs.writeFileSync(name, url.data, (err) => {
				console.log('error in data', err);
			});
			console.log(`wrote to ${name}`)
			i++;
		} catch (err) {
			i++;
		}
	});
}
readFile(file);
