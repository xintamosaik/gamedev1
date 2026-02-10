
const canvas = document.getElementById('game') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;
const keys: Record<string, boolean> = {};
let last = 0;
const speed = 50;
type Position = {
    x: number;
    y: number;
}
type Render = {
    color: string;
}
type Velocity = {
    vx: number;
    vy: number;
}
interface Movable {
    position: Position;
    velocity: Velocity;
}

interface Renderable {
    position: Position;
    render: Render;
}

function isMovable(entity: any): entity is Movable {
    return 'velocity' in entity && 'position' in entity;
}

function isRenderable(entity: any): entity is Renderable {
    return 'render' in entity && 'position' in entity;
}
const player = {
    position: { x: 100, y: 100 },
    velocity: { vx: 0, vy: 0 },
    render: { color: '#ff8080' }
};


const tree = {
    position: { x: 300, y: 200 },
    render: { color: '#2ecc71' }
};

const entities = [player, tree];

function updateInputLogic(velocity: Velocity): void {
    velocity.vx = 0;
    velocity.vy = 0;

    if (keys['ArrowUp']) velocity.vy = -1;
    if (keys['ArrowDown']) velocity.vy = 1;
    if (keys['ArrowLeft']) velocity.vx = -1;
    if (keys['ArrowRight']) velocity.vx = 1;

    if (velocity.vx !== 0 && velocity.vy !== 0) {
        const length = Math.sqrt(velocity.vx * velocity.vx + velocity.vy * velocity.vy);
        velocity.vx /= length;
        velocity.vy /= length;
    }
}
function render(
    pos: Position,
    ren: Render,
): void {
    context.fillStyle = ren.color;
    context.fillRect(pos.x, pos.y, 50, 50);
}

export function move(
    pos: Position,
    vel: Velocity,
    delta: number,
    speed: number
): void {
    pos.x += vel.vx * speed * delta;
    pos.y += vel.vy * speed * delta;
}

function gameLoop(timestamp: number): void {
    const delta = (timestamp - last) / 1000;
    last = timestamp;
    updateInputLogic(player.velocity);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const entity of entities) {

        if (isMovable(entity)) {
            move(entity.position, entity.velocity, delta, speed);
        }

        // We are asking: "Does this have the Renderable trait?"
        if (isRenderable(entity)) {
            render(entity.position, entity.render);
        }
    }
    context.fillStyle = 'black';
    context.fillText(`FPS: ${Math.round(1 / delta)}`, 10, 30);

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);