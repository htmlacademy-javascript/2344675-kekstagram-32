import {mockPosts} from './mock-generation.js';
import {drawThumbs} from './draw-thumbs.js';

const data = mockPosts;
export {data};
drawThumbs(data);
