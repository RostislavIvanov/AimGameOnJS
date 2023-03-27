const start = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeLeft = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#7F7F7F', '#492D7F', '#15FFE4', '#41FF1A', '#FF9000', '#FF0000', '#03FFD6', '#FF03B9', '#FFFFFF', '#FEFF58'];
let time;
let score = 0; //счет

start.addEventListener('click', (event) => {
	event.preventDefault();
	screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
	if (event.target.classList.contains('time-btn')) {
		time = Number(event.target.getAttribute('data'));
		screens[1].classList.add('up');
		startGame();

	}
})

board.addEventListener('click', (event) => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		generateCircle();
	}
})

function startGame() {
	setInterval(timer, 1000);
	setTime(time);
	generateCircle();
}

function timer() {
	if (time === 0) {
		stopGame();
	}
	else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	timeLeft.innerHTML = `00:${value}`;
}

function stopGame() {
	if (board.hasChildNodes) {
		const circle = board.querySelector('.circle');
		circle.remove();

	}
	board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
	timeLeft.parentNode.remove();
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function generateCircle() {
	let circle = document.createElement('div');
	circle.classList.add('circle');
	const cirleSize = getRandomNumber(20, 50);
	circle.style.width = `${cirleSize}px`;
	circle.style.height = `${cirleSize}px`;
	const boardSizeX = board.offsetWidth;
	const boardSizeY = board.offsetHeight;
	circle.style.left = `${getRandomNumber(cirleSize, boardSizeX - cirleSize)}px`;
	circle.style.top = `${getRandomNumber(cirleSize, boardSizeY - cirleSize)}px`;
	circle.style.backgroundColor = `${colors[getRandomNumber(0, colors.length - 1)]}`
	board.append(circle);
}
