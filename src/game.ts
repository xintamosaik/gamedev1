
const canvas = document.getElementById('game') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;
const MAX_DELTA_TIME = 0.05;
let previousFrameTime = 0;

// INPUT
const keys: Record<string, boolean> = {};
window.addEventListener('keydown', e => { keys[e.key] = true; });
window.addEventListener('keyup', e => { keys[e.key] = false; });


const tree = {
	x: 200,
	y: 100,
	w: 60,
	h: 60,
	color: '#428345',
	solid: true,
}
const bush = {
	x: 300,
	y: 200,
	w: 40,
	h: 40,
	color: '#47734c',
	solid: true,
}
const shrine = {
	x: 450,
	y: 140,
	w: 50,
	h: 50,
	color: '#8e44ad',
	solid: true,
	interactable: true,
};
// PLAYER
const player = {
	speed: 200,
	x: 100,
	y: 100,
	w: 50,
	h: 50,
	vx: 0,
	vy: 0,
	dx: 0,
	dy: 0,
	color: '#d5a442',
	aura: 20,
}

function collides(rect1: { x: number, y: number, w: number, h: number }, rect2: { x: number, y: number, w: number, h: number }): boolean {
	return rect1.x < rect2.x + rect2.w &&
		rect1.x + rect1.w > rect2.x &&
		rect1.y < rect2.y + rect2.h &&
		rect1.y + rect1.h > rect2.y;
}
// LOOP
const gameObjects = [tree, bush, shrine];
function gameLoop(timestamp: number): void {
	const deltaTime = Math.min(
		(timestamp - previousFrameTime) / 1000,
		MAX_DELTA_TIME
	);

	player.vx = 0;
	player.vy = 0;
	if (keys['w']) player.vy = -1;
	if (keys['s']) player.vy = 1;
	if (keys['a']) player.vx = -1;
	if (keys['d']) player.vx = 1;
	if (player.vx && player.vy) {
		const distance = Math.hypot(player.vx, player.vy);
		player.vx /= distance;
		player.vy /= distance;
	}
	const step = player.speed * deltaTime;

	const projection = {
		x: player.x + player.vx * step,
		y: player.y + player.vy * step,
		w: player.w,
		h: player.h,
	};

	const collision = gameObjects.some(rect => rect.solid && collides(projection, rect));

	if (!collision) {
		player.x = projection.x;
		player.y = projection.y;
	}

	// RENDER
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (const rect of [...gameObjects, player]) {
		context.fillStyle = rect.color;
		context.fillRect(rect.x, rect.y, rect.w, rect.h);
	}

	previousFrameTime = timestamp;
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
