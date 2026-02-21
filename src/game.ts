
const canvas = document.getElementById('game') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;
const MAX_DELTA_TIME = 0.05;
let previousFrameTime = 0;

// INPUT
const keys: Record<string, boolean> = {};
window.addEventListener('keydown', e => { keys[e.key] = true; });
window.addEventListener('keyup', e => { keys[e.key] = false; });
type Rect = { x: number; y: number; w: number; h: number };

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
function overlapsX(a: Rect, b: Rect) {
	return a.x < b.x + b.w && a.x + a.w > b.x;
}
function overlapsY(a: Rect, b: Rect) {
	return a.y < b.y + b.h && a.y + a.h > b.y;
}
function collides(a: Rect, b: Rect) {
	return overlapsX(a, b) && overlapsY(a, b);
}
// LOOP
const solids = [tree, bush, shrine];
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

	player.dx = player.vx * step;
	player.dy = player.vy * step;

	player.x += player.dx;
	for (const obj of solids) {
		if (collides(player, obj)) {
			if (player.vx > 0) {
				player.x = obj.x - player.w;
			} else if (player.vx < 0) {
				player.x = obj.x + obj.w;
			}
		}
	}

	player.y += player.dy;
	for (const obj of solids) {
		if (collides(player, obj)) {
			if (player.vy > 0) {
				player.y = obj.y - player.h;
			} else if (player.vy < 0) {
				player.y = obj.y + obj.h;
			}
		}
	}


	// RENDER
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (const rect of [...solids, player]) {
		context.fillStyle = rect.color;
		context.fillRect(rect.x, rect.y, rect.w, rect.h);
	}

	previousFrameTime = timestamp;
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
