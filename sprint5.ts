const reportJokes: Joke[] = [];
class Joke {
	joke: string;
	score: number;
	date: Date;

	constructor(joke: string, date: Date) {
		this.joke = joke;
		this.score = 0;
		this.date = date;
	}
	goodScore() {
		this.score += 3;
	}

	normalScore() {
		this.score += 2;
	}

	badScore() {
		this.score += 1;
	}
}
const getNewJoke = () => {
	fetch('https://icanhazdadjoke.com/', {
		headers: {
			Accept: 'application/json'
		}
	})
		.then((res) => res.json())
		.then((data) => {
			const newJoke: Joke = new Joke(JSON.stringify(data.joke), new Date());
			reportJokes.push(newJoke);
			printJokes();
		})
		.catch((e) => console.error(new Error(e)));
};

function printJokes() {
	const table = document.getElementById('jokes');
	let rows: string = '';
	reportJokes.forEach((a, i) => {
		rows +=
			'<tr class="card"><td>' +
			a.joke + 
			' <br> <b> Score: </td><td>' +
			a.score +
			'</b> <br> <br> Date: </td><td>' +
			a.date +
			'</td></tr>' +
			'<tr><td>' +
			"<input type='button' value='👍' onclick='upvote(" +
			i +
			")' >" +
			"<input type='button' value='✊' onclick='normalVote(" +
			i +
			")' >" +
			"<input type='button' value='👎' onclick='downvote(" +
			i +
			")' >" +
			'</td><td>';
	});
	table!.innerHTML = rows;
}

function upvote(index: number) {
	reportJokes[index].goodScore();
	printJokes();
}

function normalVote(index: number) {
	reportJokes[index].normalScore();
	printJokes();
}

function downvote(index: number) {
	reportJokes[index].badScore();
	printJokes();
}

const weather = document.getElementById('weather')

const weatherAPI = () => {

		fetch('https://api.openweathermap.org/data/2.5/weather?q=barcelona&appid=ed0592a3ab79355af43304d41d90bf38&units=metric&lang=es', {
	headers: {
				Accept: 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				const newJoke: Joke = new Joke(JSON.stringify(data.weather[0].description), new Date());
				reportJokes.push(newJoke);
				printJokes();
			})
			.catch((e) => console.error(new Error(e)));
	};
	
weatherAPI()
