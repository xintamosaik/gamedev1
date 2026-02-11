import type { Static } from '../types';

const grass = {
    position: { x: 200, y: 100 },
    render: { color: '#6dd072' }
};


const tree = {
    position: { x: 300, y: 200 },
    render: { color: '#2ecc71' }
};

const world: Static[] = [grass, tree];
export default world;

