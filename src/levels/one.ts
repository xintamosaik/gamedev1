
import type { Level } from 'levels/types';
const levelOne: Level = {
    background: { kind: 'solid', color: '#f33030' },
    statics: [
        {
            position: { x: 200, y: 100 },
            render: { color: '#6dd072' /*, w: 50, h: 50 */ },
        },
        {
            position: { x: 300, y: 200 },
            render: { color: '#2ecc71' /*, w: 50, h: 50 */ },
        },
    ],
};

export default levelOne;
