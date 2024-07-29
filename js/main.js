import {mockPosts} from './mock-generation.js';
import {drawThumbs} from './draw-thumbs.js';
// get data
//render data

const data = mockPosts;
export {data};
drawThumbs(data);
