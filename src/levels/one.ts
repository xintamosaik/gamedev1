
import type { Level } from 'levels/types';
const levelOne: Level = {
    background: { kind: 'solid', color: '#2c3e50' },
    statics: [
        {
            position: { x: 200, y: 100 },
            render: { color: '#428345' /*, w: 50, h: 50 */ },
        },
        {
            position: { x: 300, y: 200 },
            render: { color: '#47734c' /*, w: 50, h: 50 */ },
        },
    ],
};

export default levelOne;
