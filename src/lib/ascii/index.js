import decode from './effects/decode.js';
import cube from './effects/cube.js';
import torus from './effects/torus.js';
import pixelShark from './effects/pixelShark.js';

export const effects = { decode, cube, torus, pixelShark };
export { createAsciiRenderer } from './engine.js';
