

const MOVEMENT_SCALE = 200; // max 50ms step
const player = {
    speed: 200,
    position: { x: 100, y: 100 },
    dimensions: { w: 50, h: 50 },
    velocity: { vx: 0, vy: 0 },
    render: { color: '#d5a442' },
    aura: 20,
    updateMovement(keys: Record<string, boolean>, delta: number): void {
        this.velocity.vx = 0;
        this.velocity.vy = 0;

        if (keys['w']) this.velocity.vy = -1;
        if (keys['s']) this.velocity.vy = 1;
        if (keys['a']) this.velocity.vx = -1;
        if (keys['d']) this.velocity.vx = 1;

        if (this.velocity.vx && this.velocity.vy) {
            const len = Math.hypot(this.velocity.vx, this.velocity.vy);
            this.velocity.vx /= len;
            this.velocity.vy /= len;
        }

        const distance = this.speed * delta;
        this.position.x += this.velocity.vx * distance;
        this.position.y += this.velocity.vy * distance;
    },
}


export default player