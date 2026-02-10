
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

class MovementSystem {
    update(entities, delta) {
        entities.forEach(entity => {
            const position = entity.getComponent('position');
            const velocity = entity.getComponent('velocity');
            
            if (position && velocity) {
                position.x += velocity.vx * delta;
                position.y += velocity.vy * delta;
            }
        });
    }
}

// Create an entity and add components
let player = new Entity(1);
player.addComponent('position', new PositionComponent(0, 0));
player.addComponent('velocity', new VelocityComponent(1, 1));
let entities = [player];
let movementSystem = new MovementSystem();

function gameLoop(timestamp) {
    delta = (timestamp - last) / 1000;
    last = timestamp
    
    movementSystem.update(entities, delta);
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Render entities
    entities.forEach(entity => {
        const position = entity.getComponent('position');
        if (position) {
            console.log(`Entity ${entity.id} Position: (${position.x}, ${position.y})`);
                context.fillStyle = '#ff8080';
                context.fillRect(position.x, position.y, 40, 40);
        }
    });
    window.requestAnimationFrame(gameLoop);
}
window.requestAnimationFrame(gameLoop);