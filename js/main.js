import {mockPosts} from './mock-generation.js';
import {drawThumbs} from './draw-thumbs.js';
import './upload-form.js';
import './upload-scale.js';
import './effects.js';

const data = mockPosts;
drawThumbs(data);
