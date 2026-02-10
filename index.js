const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
let delta = 0;
let last = 0;
let fps;
let speed = 50;
let rectX = 0.0;
let rectY = 0.0;

class Entity {
    constructor(id) {
        this.id = id;
        this.components = {};
    }

    addComponent(name, component) {
        this.components[name] = component;
    }

    getComponent(name) {
        return this.components[name];
    }
}

class PositionComponent {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class VelocityComponent {
    constructor(vx, vy) {
        this.vx = vx;
        this.vy = vy;
    }
}

class RenderComponent {
    constructor(color) {
        this.color = color;
    }
}
class MovementSystem {
    update(entities, delta) {
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const velocity = entity.getComponent('velocity');

            if (position && velocity) {
                position.x += velocity.vx * speed * delta;
                position.y += velocity.vy * speed * delta;
            }
        });
    }
}

class InputSystem {
    constructor() {
        this.keys = {};
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    update(entities) {
        entities.forEach(entity => {
            const velocity = entity.getComponent('velocity');
            if (velocity) {
                if (this.keys['ArrowUp']) velocity.vy = -1;
                if (this.keys['ArrowDown']) velocity.vy = 1;
                if (this.keys['ArrowLeft']) velocity.vx = -1;
                if (this.keys['ArrowRight']) velocity.vx = 1;
            }
        });
    }
}
class RenderSystem {
    constructor(context) {
        this.context = context;
    }

    update(entities) {
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const render = entity.getComponent('render');

            if (position && render) {
                this.context.fillStyle = render.color;
                this.context.fillRect(position.x, position.y, 50, 50);
            }
        });
    }
}

// Create an entity and add components
let player = new Entity(1);
player.addComponent('position', new PositionComponent(100, 100));
player.addComponent('velocity', new VelocityComponent(0, 0));
player.addComponent('render', new RenderComponent('#ff8080'));

let entities = [player];
let movementSystem = new MovementSystem();
let inputSystem = new InputSystem();
let renderSystem = new RenderSystem(context);

function gameLoop(timestamp) {
    delta = (timestamp - last) / 1000;
    last = timestamp;
    fps = Math.round(1 / delta);
    
 
    inputSystem.update(entities);
    movementSystem.update(entities, delta);
    renderSystem.update(entities);
    // Display FPS on screen
    context.fillStyle = 'white';
    context.fillRect(0, 0, 200, 50);
    context.font = '20px Arial';
    context.fillStyle = 'black';
    context.fillText(`FPS: ${fps}`, 10, 30);

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
