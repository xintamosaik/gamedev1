const keys: Record<string, boolean> = {};
window.addEventListener('keydown', e => { keys[e.key] = true; });
window.addEventListener('keyup', e => { keys[e.key] = false; });

export const canvas = document.getElementById('game') as HTMLCanvasElement;
export const context = canvas.getContext('2d')!;

const DEBUG = true

let previousFrameTime = 0;
const MAX_DELTA_TIME = 0.05;

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
    updateMovement(keys: Record<string, boolean>, delta: number): void {
        this.vx = 0;
        this.vy = 0;

        if (keys['w']) this.vy = -1;
        if (keys['s']) this.vy = 1;
        if (keys['a']) this.vx = -1;
        if (keys['d']) this.vx = 1;

        if (this.vx && this.vy) {
            const len = Math.hypot(this.vx, this.vy);
            this.vx /= len;
            this.vy /= len;
        }

        const distance = this.speed * delta;
        this.x += this.vx * distance;
        this.y += this.vy * distance;
    },
}
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
const background = {
	color: '#111',
	x:0,
	y:0,
	w: canvas.width,
	h: canvas.height,
}

function gameLoop(timestamp: number): void {

	const deltaTime = Math.min(
		(timestamp - previousFrameTime) / 1000,
		MAX_DELTA_TIME
	);

	player.updateMovement(keys, deltaTime);

	for (const rect of [background, tree, bush, shrine, player]) {
	    context.fillStyle = rect.color;
	    context.fillRect(rect.x, rect.y, rect.w, rect.h);
	}
	
	if (DEBUG) context.fillStyle = '#0f0';
	if (DEBUG) context.fillText(`FPS: ${Math.round(1 / deltaTime)}`, 10, 30);

	previousFrameTime = timestamp;
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

